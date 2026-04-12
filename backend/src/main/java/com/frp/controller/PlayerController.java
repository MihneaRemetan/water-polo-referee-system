package com.frp.controller;

import com.frp.model.Player;
import com.frp.model.Team;
import com.frp.repository.PlayerRepository;
import com.frp.repository.TeamRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

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
    public List<Player> getAll() {
        List<Player> players = playerRepository.findAll();
        players.sort(Comparator
                .comparing((Player p) -> p.getTeam() != null && p.getTeam().getName() != null ? p.getTeam().getName() : "")
                .thenComparing(p -> p.getNumber() != null ? p.getNumber() : 0));
        return players;
    }

    @GetMapping("/team/{teamId}")
    public List<Player> getByTeam(@PathVariable Long teamId) {
        return playerRepository.findByTeamIdOrderByNumberAsc(teamId);
    }

    @PostMapping
    public Player create(@RequestBody Player player) {
        validatePlayer(player);

        Long teamId = player.getTeam().getId();
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Echipa nu a fost găsită."));

        String playerCode = generatePlayerCode(team, player.getNumber());

        if (playerRepository.existsByPlayerCode(playerCode)) {
            throw new RuntimeException("Există deja un jucător cu codul " + playerCode);
        }

        player.setTeam(team);
        player.setPlayerCode(playerCode);

        return playerRepository.save(player);
    }

    @PutMapping("/{id}")
    public Player update(@PathVariable Long id, @RequestBody Player updated) {
        Player existing = playerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Jucătorul nu a fost găsit."));

        validatePlayer(updated);

        Long teamId = updated.getTeam().getId();
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Echipa nu a fost găsită."));

        String playerCode = generatePlayerCode(team, updated.getNumber());

        playerRepository.findByPlayerCode(playerCode).ifPresent(player -> {
            if (!player.getId().equals(id)) {
                throw new RuntimeException("Există deja un jucător cu codul " + playerCode);
            }
        });

        existing.setName(updated.getName());
        existing.setNumber(updated.getNumber());
        existing.setPosition(updated.getPosition());
        existing.setGender(updated.getGender());
        existing.setTeam(team);
        existing.setPlayerCode(playerCode);

        return playerRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (!playerRepository.existsById(id)) {
            throw new RuntimeException("Jucătorul nu a fost găsit.");
        }
        playerRepository.deleteById(id);
    }

    private void validatePlayer(Player player) {
        if (player.getName() == null || player.getName().isBlank()) {
            throw new RuntimeException("Numele este obligatoriu.");
        }

        if (player.getNumber() == null || player.getNumber() < 1 || player.getNumber() > 99) {
            throw new RuntimeException("Numărul trebuie să fie între 1 și 99.");
        }

        if (player.getTeam() == null || player.getTeam().getId() == null) {
            throw new RuntimeException("Echipa este obligatorie.");
        }
    }

    private String generatePlayerCode(Team team, Integer number) {
        String shortName = team.getShortName();

        if (shortName == null || shortName.isBlank()) {
            String teamName = team.getName() == null ? "TEAM" : team.getName().trim();
            shortName = teamName.length() >= 3
                    ? teamName.substring(0, 3).toUpperCase()
                    : teamName.toUpperCase();
        }

        return shortName.toUpperCase() + "_" + String.format("%02d", number);
    }
}