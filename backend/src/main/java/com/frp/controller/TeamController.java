package com.frp.controller;

import com.frp.model.Team;
import com.frp.repository.TeamRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/teams")
@CrossOrigin(origins = "*")
public class TeamController {

    private final TeamRepository teamRepository;

    public TeamController(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @GetMapping
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable Long id) {
        Optional<Team> team = teamRepository.findById(id);
        return team.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createTeam(@RequestBody Team team) {
        if (team.getName() == null || team.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Team name is required.");
        }

        if (teamRepository.findByName(team.getName().trim()).isPresent()) {
            return ResponseEntity.badRequest().body("A team with this name already exists.");
        }

        if (team.getShortName() != null && !team.getShortName().trim().isEmpty()) {
            if (teamRepository.findByShortName(team.getShortName().trim()).isPresent()) {
                return ResponseEntity.badRequest().body("A team with this short name already exists.");
            }
            team.setShortName(team.getShortName().trim());
        }

        team.setName(team.getName().trim());
        if (team.getCity() != null) {
            team.setCity(team.getCity().trim());
        }

        Team savedTeam = teamRepository.save(team);
        return ResponseEntity.ok(savedTeam);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTeam(@PathVariable Long id, @RequestBody Team updatedTeam) {
        Optional<Team> existingOptional = teamRepository.findById(id);
        if (existingOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Team existingTeam = existingOptional.get();

        if (updatedTeam.getName() == null || updatedTeam.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Team name is required.");
        }

        Optional<Team> teamWithSameName = teamRepository.findByName(updatedTeam.getName().trim());
        if (teamWithSameName.isPresent() && !teamWithSameName.get().getId().equals(id)) {
            return ResponseEntity.badRequest().body("Another team with this name already exists.");
        }

        if (updatedTeam.getShortName() != null && !updatedTeam.getShortName().trim().isEmpty()) {
            Optional<Team> teamWithSameShortName = teamRepository.findByShortName(updatedTeam.getShortName().trim());
            if (teamWithSameShortName.isPresent() && !teamWithSameShortName.get().getId().equals(id)) {
                return ResponseEntity.badRequest().body("Another team with this short name already exists.");
            }
            existingTeam.setShortName(updatedTeam.getShortName().trim());
        } else {
            existingTeam.setShortName(null);
        }

        existingTeam.setName(updatedTeam.getName().trim());
        existingTeam.setCity(updatedTeam.getCity() != null ? updatedTeam.getCity().trim() : null);

        Team savedTeam = teamRepository.save(existingTeam);
        return ResponseEntity.ok(savedTeam);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTeam(@PathVariable Long id) {
        if (!teamRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        teamRepository.deleteById(id);
        return ResponseEntity.ok("Team deleted successfully.");
    }
}