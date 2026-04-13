package com.frp.dto;

import java.util.List;

public class SaveMatchRequest {

    private Long teamAId;
    private Long teamBId;

    private Integer scoreA;
    private Integer scoreB;

    private Integer period;
    private Integer matchSeconds;
    private Integer shotClockSeconds;

    private String status;
    private String startedAt;
    private String endedAt;

    private Long createdByOfficialId;

    // 🔥 NOI
    private String referee1;
    private String referee2;
    private String observer;

    private List<MatchEventRequest> events;
    private List<MatchPlayerStatRequest> playerStats;

    public SaveMatchRequest() {}

    // getters/setters
    public Long getTeamAId() { return teamAId; }
    public void setTeamAId(Long teamAId) { this.teamAId = teamAId; }

    public Long getTeamBId() { return teamBId; }
    public void setTeamBId(Long teamBId) { this.teamBId = teamBId; }

    public Integer getScoreA() { return scoreA; }
    public void setScoreA(Integer scoreA) { this.scoreA = scoreA; }

    public Integer getScoreB() { return scoreB; }
    public void setScoreB(Integer scoreB) { this.scoreB = scoreB; }

    public Integer getPeriod() { return period; }
    public void setPeriod(Integer period) { this.period = period; }

    public Integer getMatchSeconds() { return matchSeconds; }
    public void setMatchSeconds(Integer matchSeconds) { this.matchSeconds = matchSeconds; }

    public Integer getShotClockSeconds() { return shotClockSeconds; }
    public void setShotClockSeconds(Integer shotClockSeconds) { this.shotClockSeconds = shotClockSeconds; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getStartedAt() { return startedAt; }
    public void setStartedAt(String startedAt) { this.startedAt = startedAt; }

    public String getEndedAt() { return endedAt; }
    public void setEndedAt(String endedAt) { this.endedAt = endedAt; }

    public String getReferee1() { return referee1; }
    public void setReferee1(String referee1) { this.referee1 = referee1; }

    public String getReferee2() { return referee2; }
    public void setReferee2(String referee2) { this.referee2 = referee2; }

    public String getObserver() { return observer; }
    public void setObserver(String observer) { this.observer = observer; }

    public List<MatchEventRequest> getEvents() { return events; }
    public void setEvents(List<MatchEventRequest> events) { this.events = events; }

    public List<MatchPlayerStatRequest> getPlayerStats() { return playerStats; }
    public void setPlayerStats(List<MatchPlayerStatRequest> playerStats) { this.playerStats = playerStats; }
}