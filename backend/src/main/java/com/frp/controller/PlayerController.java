package com.frp.controller;

import com.frp.model.Player;
import com.frp.model.Team;
import com.frp.repository.PlayerRepository;
import com.frp.repository.TeamRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class PlayerController {

    private final PlayerRepository playerRepository;
    private final TeamRepository teamRepository;

    public PlayerController(PlayerRepository playerRepository, TeamRepository teamRepository) {
        this.playerRepository = playerRepository;
        this.teamRepository = teamRepository;
    }

    @GetMapping
    public ResponseEntity<List<Player>> getAllPlayers() {
        List<Player> players = playerRepository.findAll();
        return ResponseEntity.ok(players);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPlayerById(@PathVariable Long id) {
        return playerRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Player not found."));
    }

    @PostMapping
    public ResponseEntity<?> createPlayer(@RequestBody Player player) {
        if (player.getName() == null || player.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Player name is required.");
        }

        if (player.getTeam() == null || player.getTeam().getId() == null) {
            return ResponseEntity.badRequest().body("Team is required.");
        }

        Optional<Team> teamOptional = teamRepository.findById(player.getTeam().getId());
        if (teamOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Selected team does not exist.");
        }

        player.setTeam(teamOptional.get());

        if (player.getPlayerCode() == null || player.getPlayerCode().trim().isEmpty()) {
            String shortName = teamOptional.get().getShortName() != null
                    ? teamOptional.get().getShortName().trim().toUpperCase()
                    : "PLY";

            long countForTeam = playerRepository.findAll().stream()
                    .filter(p -> p.getTeam() != null && p.getTeam().getId() != null)
                    .filter(p -> p.getTeam().getId().equals(teamOptional.get().getId()))
                    .count();

            String generatedCode = shortName + "_" + String.format("%02d", countForTeam + 1);
            player.setPlayerCode(generatedCode);
        }

        Player saved = playerRepository.save(player);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePlayer(@PathVariable Long id, @RequestBody Player updated) {
        Optional<Player> existingOptional = playerRepository.findById(id);
        if (existingOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Player not found.");
        }

        if (updated.getName() == null || updated.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Player name is required.");
        }

        if (updated.getTeam() == null || updated.getTeam().getId() == null) {
            return ResponseEntity.badRequest().body("Team is required.");
        }

        Optional<Team> teamOptional = teamRepository.findById(updated.getTeam().getId());
        if (teamOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Selected team does not exist.");
        }

        Player existing = existingOptional.get();

        existing.setName(updated.getName().trim());
        existing.setPosition(updated.getPosition());
        existing.setGender(updated.getGender());
        existing.setTeam(teamOptional.get());

        if (updated.getPlayerCode() != null && !updated.getPlayerCode().trim().isEmpty()) {
            existing.setPlayerCode(updated.getPlayerCode().trim());
        }

        Player saved = playerRepository.save(existing);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlayer(@PathVariable Long id) {
        if (!playerRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Player not found.");
        }

        playerRepository.deleteById(id);
        return ResponseEntity.ok("Player deleted successfully.");
    }
}