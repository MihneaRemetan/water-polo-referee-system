package com.frp.controller;

import com.frp.dto.PlayerStatisticsDto;
import com.frp.service.MatchService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/statistics")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class StatisticsController {

    private final MatchService matchService;

    public StatisticsController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping("/players")
    public List<PlayerStatisticsDto> getAllPlayerStatistics(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String team,
            @RequestParam(required = false) Integer playerNumber
    ) {
        return matchService.getPlayerStatistics(name, team, playerNumber);
    }
}