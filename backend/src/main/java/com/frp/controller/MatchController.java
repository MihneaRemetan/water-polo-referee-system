package com.frp.controller;

import com.frp.dto.MatchHistoryDto;
import com.frp.dto.SaveMatchRequest;
import com.frp.model.Match;
import com.frp.repository.MatchRepository;
import com.frp.service.MatchService;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "http://localhost:5173")
public class MatchController {

    private final MatchRepository matchRepository;
    private final MatchService matchService;

    public MatchController(MatchRepository matchRepository, MatchService matchService) {
        this.matchRepository = matchRepository;
        this.matchService = matchService;
    }

    @GetMapping
    public ResponseEntity<List<MatchHistoryDto>> getAllMatches() {
        return ResponseEntity.ok(matchService.getMatchHistory());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatchById(@PathVariable Long id) {
        return matchRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/history")
    public ResponseEntity<List<MatchHistoryDto>> getMatchHistory() {
        return ResponseEntity.ok(matchService.getMatchHistory());
    }

    @PostMapping
    public ResponseEntity<Match> saveMatch(
            @RequestBody SaveMatchRequest request,
            Authentication authentication
    ) {
        Match savedMatch = matchService.saveMatch(request, authentication);
        return ResponseEntity.ok(savedMatch);
    }


}