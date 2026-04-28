package com.frp.controller;

import com.frp.dto.MatchDetailsDto;
import com.frp.dto.MatchHistoryDto;
import com.frp.dto.SaveMatchRequest;
import com.frp.model.Match;
import com.frp.service.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping
    public ResponseEntity<List<MatchHistoryDto>> getAllMatches() {
        return ResponseEntity.ok(matchService.getMatchHistory());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MatchDetailsDto> getMatchById(@PathVariable Long id) {
        return ResponseEntity.ok(matchService.getMatchDetails(id));
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