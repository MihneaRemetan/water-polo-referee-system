package com.frp.controller;

import com.frp.dto.MatchHistoryDto;
import com.frp.model.Match;
import com.frp.repository.MatchRepository;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "http://localhost:5173")
public class MatchHistoryController {

    private final MatchRepository matchRepository;

    public MatchHistoryController(MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
    }

    @GetMapping
    public List<MatchHistoryDto> getAllMatches() {
        return matchRepository.findAll(Sort.by(Sort.Direction.DESC, "id"))
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public MatchHistoryDto getMatchById(@PathVariable Long id) {
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Match not found with id: " + id));

        return toDto(match);
    }

    private MatchHistoryDto toDto(Match match) {
        return new MatchHistoryDto(
                match.getId(),
                match.getTeamAName(),
                match.getTeamBName(),
                match.getScoreA(),
                match.getScoreB(),
                match.getPeriod(),
                match.getMatchSeconds(),
                match.getShotClockSeconds(),
                match.getStatus(),
                match.getStartedAt(),
                match.getEndedAt(),
                match.getCreatedByOfficialId()
        );
    }
}