package com.frp.service;

import com.frp.dto.MatchEventRequest;
import com.frp.dto.MatchPlayerStatRequest;
import com.frp.dto.SaveMatchRequest;
import com.frp.model.Match;
import com.frp.model.MatchEvent;
import com.frp.model.MatchPlayerStat;
import com.frp.repository.MatchRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class MatchService {

    private final MatchRepository matchRepository;

    public MatchService(MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
    }

    @Transactional
    public Match saveMatch(SaveMatchRequest request) {
        Match match = new Match();

        match.setTeamAName(request.getTeamAName());
        match.setTeamBName(request.getTeamBName());
        match.setScoreA(request.getScoreA());
        match.setScoreB(request.getScoreB());
        match.setPeriod(request.getPeriod());
        match.setMatchSeconds(request.getMatchSeconds());
        match.setShotClockSeconds(request.getShotClockSeconds());
        match.setStatus(request.getStatus());

        if (request.getStartedAt() != null && !request.getStartedAt().isBlank()) {
            match.setStartedAt(LocalDateTime.parse(request.getStartedAt()));
        }

        if (request.getEndedAt() != null && !request.getEndedAt().isBlank()) {
            match.setEndedAt(LocalDateTime.parse(request.getEndedAt()));
        }

        match.setCreatedByOfficialId(request.getCreatedByOfficialId());

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
}