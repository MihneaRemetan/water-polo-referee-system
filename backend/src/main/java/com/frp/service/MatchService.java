package com.frp.service;

import com.frp.dto.MatchHistoryDto;
import com.frp.dto.MatchEventRequest;
import com.frp.dto.MatchPlayerStatRequest;
import com.frp.dto.PlayerStatisticsDto;
import com.frp.dto.SaveMatchRequest;
import com.frp.model.Match;
import com.frp.model.MatchEvent;
import com.frp.model.MatchPlayerStat;
import com.frp.model.Team;
import com.frp.repository.MatchPlayerStatRepository;
import com.frp.repository.MatchRepository;
import com.frp.repository.TeamRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class MatchService {

    private final MatchRepository matchRepository;
    private final MatchPlayerStatRepository matchPlayerStatRepository;
    private final TeamRepository teamRepository;

    public MatchService(
            MatchRepository matchRepository,
            MatchPlayerStatRepository matchPlayerStatRepository,
            TeamRepository teamRepository
    ) {
        this.matchRepository = matchRepository;
        this.matchPlayerStatRepository = matchPlayerStatRepository;
        this.teamRepository = teamRepository;
    }

    public List<PlayerStatisticsDto> getPlayerStatistics(String name, String team, Integer playerNumber) {
        List<MatchPlayerStat> allStats = matchPlayerStatRepository.findAll();

        Map<String, List<MatchPlayerStat>> grouped = allStats.stream()
            .filter(stat -> stat.getPlayerNumber() != null)
            .filter(stat -> name == null || name.isBlank()
                    || ((stat.getPlayerName() != null)
                    && stat.getPlayerName().toLowerCase().contains(name.trim().toLowerCase())))
            .filter(stat -> team == null || team.isBlank()
                    || (stat.getTeam() != null
                    && stat.getTeam().toLowerCase().contains(team.trim().toLowerCase())))
            .filter(stat -> playerNumber == null
                    || Objects.equals(stat.getPlayerNumber(), playerNumber))
            .collect(Collectors.groupingBy(stat ->
                    (stat.getPlayerName() == null ? "" : stat.getPlayerName().trim().toLowerCase()) + "|"
                            + (stat.getTeam() == null ? "" : stat.getTeam().trim().toLowerCase()) + "|"
                            + stat.getPlayerNumber()
            ));

        List<PlayerStatisticsDto> result = new ArrayList<>();

        for (List<MatchPlayerStat> stats : grouped.values()) {
            MatchPlayerStat first = stats.get(0);

            int matchesPlayed = (int) stats.stream()
                    .map(stat -> stat.getMatch() != null ? stat.getMatch().getId() : null)
                    .filter(Objects::nonNull)
                    .distinct()
                    .count();

            int totalGoals = stats.stream().mapToInt(stat -> safeInt(stat.getGoals())).sum();
            int totalFouls = stats.stream().mapToInt(stat -> safeInt(stat.getFouls())).sum();
            int totalYellow = stats.stream().mapToInt(stat -> safeInt(stat.getYellowCards())).sum();
            int totalRed = stats.stream().mapToInt(stat -> safeInt(stat.getRedCards())).sum();
            int totalExclusions = (int) stats.stream()
                    .filter(stat -> Boolean.TRUE.equals(stat.getExcluded()))
                    .count();

            double goalsPerMatch = matchesPlayed == 0 ? 0.0 : (double) totalGoals / matchesPlayed;
            double foulsPerMatch = matchesPlayed == 0 ? 0.0 : (double) totalFouls / matchesPlayed;

            result.add(new PlayerStatisticsDto(
                    first.getPlayerName(),
                    first.getTeam(),
                    first.getPlayerNumber(),
                    matchesPlayed,
                    totalGoals,
                    totalFouls,
                    totalYellow,
                    totalRed,
                    totalExclusions,
                    goalsPerMatch,
                    foulsPerMatch
            ));
        }

        result.sort(
                Comparator.comparing(
                                PlayerStatisticsDto::getTotalGoals,
                                Comparator.nullsFirst(Comparator.reverseOrder())
                        )
                        .thenComparing(
                                PlayerStatisticsDto::getPlayerName,
                                Comparator.nullsLast(String::compareToIgnoreCase)
                        )
        );

        return result;
    }

    private int safeInt(Integer value) {
        return value == null ? 0 : value;
    }

    @Transactional
    public Match saveMatch(SaveMatchRequest request, Authentication authentication) {
        if (request.getTeamAId() == null) {
            throw new RuntimeException("Team A is required");
        }

        if (request.getTeamBId() == null) {
            throw new RuntimeException("Team B is required");
        }

        Team teamA = teamRepository.findById(request.getTeamAId())
                .orElseThrow(() -> new RuntimeException("Team A not found"));

        Team teamB = teamRepository.findById(request.getTeamBId())
                .orElseThrow(() -> new RuntimeException("Team B not found"));

        if (teamA.getId().equals(teamB.getId())) {
            throw new RuntimeException("A team cannot play against itself");
        }

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        String userId = authentication.getName();

        Match match = new Match();

        match.setTeamA(teamA);
        match.setTeamB(teamB);
        match.setScoreA(request.getScoreA() != null ? request.getScoreA() : 0);
        match.setScoreB(request.getScoreB() != null ? request.getScoreB() : 0);
        match.setPeriod(request.getPeriod());
        match.setMatchSeconds(request.getMatchSeconds());
        match.setShotClockSeconds(request.getShotClockSeconds());
        match.setStatus(request.getStatus());
        match.setReferee1(request.getReferee1());
        match.setReferee2(request.getReferee2());
        match.setObserver(request.getObserver());

        if (request.getStartedAt() != null && !request.getStartedAt().isBlank()) {
            match.setStartedAt(LocalDateTime.parse(request.getStartedAt()));
        }

        if (request.getEndedAt() != null && !request.getEndedAt().isBlank()) {
            match.setEndedAt(LocalDateTime.parse(request.getEndedAt()));
        }

        match.setCreatedByOfficialId(
                userId != null && userId.matches("\\d+")
                        ? Long.parseLong(userId)
                        : null
        );

        if (request.getEvents() != null) {
            for (MatchEventRequest eventRequest : request.getEvents()) {
                MatchEvent event = new MatchEvent();
                event.setTeam(eventRequest.getTeam());
                event.setPlayerNumber(eventRequest.getPlayerNumber());
                event.setPlayerName(eventRequest.getPlayerName());
                event.setEventType(eventRequest.getEventType());
                event.setEventTimeSeconds(eventRequest.getEventTimeSeconds());
                event.setPeriod(eventRequest.getPeriod());
                event.setDetails(eventRequest.getDetails());

                match.addEvent(event);
            }
        }

        if (request.getPlayerStats() != null) {
            for (MatchPlayerStatRequest statRequest : request.getPlayerStats()) {
                MatchPlayerStat stat = new MatchPlayerStat();
                stat.setTeam(statRequest.getTeam());
                stat.setPlayerNumber(statRequest.getPlayerNumber());
                stat.setPlayerName(statRequest.getPlayerName());
                stat.setGoals(statRequest.getGoals());
                stat.setFouls(statRequest.getFouls());
                stat.setYellowCards(statRequest.getYellowCards());
                stat.setRedCards(statRequest.getRedCards());
                stat.setExcluded(statRequest.getExcluded());

                match.addPlayerStat(stat);
            }
        }

        return matchRepository.save(match);
    }

    public List<MatchHistoryDto> getMatchHistory() {
        return matchRepository.findAllWithTeams().stream()
                .map(match -> {
                    Integer scoreA = match.getScoreA();
                    Integer scoreB = match.getScoreB();

                    // fallback dacă sunt null
                    int safeScoreA = scoreA != null ? scoreA : 0;
                    int safeScoreB = scoreB != null ? scoreB : 0;

                    String winner;
                    if (safeScoreA > safeScoreB) {
                        winner = match.getTeamA().getName();
                    } else if (safeScoreB > safeScoreA) {
                        winner = match.getTeamB().getName();
                    } else {
                        winner = "Draw";
                    }

                    return new MatchHistoryDto(
                        match.getId(),
                        match.getTeamA().getName(),
                        match.getTeamB().getName(),
                        match.getScoreA(),
                        match.getScoreB(),
                        match.getPeriod(),
                        match.getMatchSeconds(),
                        match.getShotClockSeconds(),
                        match.getStatus(),
                        match.getStartedAt(),
                        match.getEndedAt(),
                        match.getCreatedByOfficialId(),
                        match.getReferee1(),
                        match.getReferee2(),
                        match.getObserver()
                    );
                })
                .toList();
    }
}