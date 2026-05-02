package com.frp.service;

import com.frp.dto.MatchHistoryDto;
import com.frp.dto.MatchDetailsDto;
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
import com.frp.dto.TeamStandingDto;
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
import java.util.HashMap;
import java.util.LinkedHashMap;

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
        match.setRefereeC1(request.getRefereeC1());
        match.setRefereeC2(request.getRefereeC2());
        match.setSecretary1(request.getSecretary1());
        match.setSecretary2(request.getSecretary2());
        match.setTimekeeper(request.getTimekeeper());
        match.setRefereeP1(request.getRefereeP1());
        match.setRefereeP2(request.getRefereeP2());
        match.setObserver(request.getObserver());
        match.setChampionship(request.getChampionship());
        match.setMatchDate(request.getMatchDate());
        match.setMatchNumber(request.getMatchNumber());
        match.setLocation(request.getLocation());

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

    public MatchDetailsDto getMatchDetails(Long id) {
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Match not found"));

        MatchDetailsDto dto = new MatchDetailsDto();

        dto.setId(match.getId());
        dto.setTeamAName(match.getTeamA().getName());
        dto.setTeamBName(match.getTeamB().getName());
        dto.setScoreA(match.getScoreA());
        dto.setScoreB(match.getScoreB());
        dto.setStatus(match.getStatus());
        dto.setStartedAt(match.getStartedAt());
        dto.setEndedAt(match.getEndedAt());

        dto.setRefereeC1(match.getRefereeC1());
        dto.setRefereeC2(match.getRefereeC2());
        dto.setSecretary1(match.getSecretary1());
        dto.setSecretary2(match.getSecretary2());
        dto.setTimekeeper(match.getTimekeeper());
        dto.setRefereeP1(match.getRefereeP1());
        dto.setRefereeP2(match.getRefereeP2());
        dto.setObserver(match.getObserver());

        // EVENTS (fix corect pentru câmpurile tale)
        dto.setEvents(match.getEvents().stream().map(event -> {
            MatchEventRequest e = new MatchEventRequest();

            e.setTeam(event.getTeam());
            e.setPlayerNumber(event.getPlayerNumber());
            e.setPlayerName(event.getPlayerName());
            e.setEventType(event.getEventType());
            e.setEventTimeSeconds(event.getEventTimeSeconds());
            e.setPeriod(event.getPeriod());
            e.setDetails(event.getDetails());

            return e;
        }).toList());

        // PLAYER STATS (fix corect pentru modelul tău)
        dto.setPlayerStats(match.getPlayerStats().stream().map(stat -> {
            PlayerStatisticsDto s = new PlayerStatisticsDto();

            s.setPlayerName(stat.getPlayerName());
            s.setTeam(stat.getTeam());
            s.setPlayerNumber(stat.getPlayerNumber());
            s.setTotalGoals(stat.getGoals());
            s.setTotalFouls(stat.getFouls());
            s.setTotalYellowCards(stat.getYellowCards());
            s.setTotalRedCards(stat.getRedCards());
            s.setTotalExclusions(Boolean.TRUE.equals(stat.getExcluded()) ? 1 : 0);

            return s;
        }).toList());

        return dto;
    }

    public List<MatchHistoryDto> getMatchHistory() {
        return matchRepository.findAllWithTeams().stream()
                .map(match -> {
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
                        match.getRefereeC1(),
                        match.getRefereeC2(),
                        match.getSecretary1(),
                        match.getSecretary2(),
                        match.getTimekeeper(),
                        match.getRefereeP1(),
                        match.getRefereeP2(),
                        match.getObserver(),
                        match.getChampionship(),
                        match.getMatchDate(),
                        match.getMatchNumber(),
                        match.getLocation()
                    );
                })
                .toList();
    }

    @Transactional(readOnly = true)
        public List<TeamStandingDto> getTeamStandings() {
            List<Team> teams = teamRepository.findAll();
            List<Match> matches = matchRepository.findAll();

            Map<String, TeamStandingDto> standings = new HashMap<>();

            for (Team team : teams) {
                standings.put(team.getName(), new TeamStandingDto(team.getName()));
            }

            for (Match match : matches) {
                if (match.getTeamA() == null || match.getTeamB() == null) {
                    continue;
                }

                String teamAName = match.getTeamA().getName();
                String teamBName = match.getTeamB().getName();

                int scoreA = match.getScoreA();
                int scoreB = match.getScoreB();

                TeamStandingDto teamAStanding = standings.get(teamAName);
                TeamStandingDto teamBStanding = standings.get(teamBName);

                if (teamAStanding == null || teamBStanding == null) {
                    continue;
                }

                if (scoreA > scoreB) {
                    teamAStanding.addWin(scoreA, scoreB);
                    teamBStanding.addLoss(scoreB, scoreA);
                } else if (scoreA < scoreB) {
                    teamAStanding.addLoss(scoreA, scoreB);
                    teamBStanding.addWin(scoreB, scoreA);
                } else {
                    teamAStanding.addDraw(scoreA, scoreB);
                    teamBStanding.addDraw(scoreB, scoreA);
                }
            }

            return standings.values()
                    .stream()
                    .sorted(
                            Comparator.comparingInt(TeamStandingDto::getPoints).reversed()
                                    .thenComparing(Comparator.comparingInt(TeamStandingDto::getGoalDifference).reversed())
                                    .thenComparing(Comparator.comparingInt(TeamStandingDto::getWins).reversed())
                                    .thenComparing(TeamStandingDto::getTeamName)
                    )
                    .collect(Collectors.toList());
        }
}