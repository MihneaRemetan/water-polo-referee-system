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

    private List<MatchEventRequest> events;
    private List<MatchPlayerStatRequest> playerStats;

    public SaveMatchRequest() {
    }

    public Long getTeamAId() {
        return teamAId;
    }

    public void setTeamAId(Long teamAId) {
        this.teamAId = teamAId;
    }

    public Long getTeamBId() {
        return teamBId;
    }

    public void setTeamBId(Long teamBId) {
        this.teamBId = teamBId;
    }

    public Integer getScoreA() {
        return scoreA;
    }

    public void setScoreA(Integer scoreA) {
        this.scoreA = scoreA;
    }

    public Integer getScoreB() {
        return scoreB;
    }

    public void setScoreB(Integer scoreB) {
        this.scoreB = scoreB;
    }

    public Integer getPeriod() {
        return period;
    }

    public void setPeriod(Integer period) {
        this.period = period;
    }

    public Integer getMatchSeconds() {
        return matchSeconds;
    }

    public void setMatchSeconds(Integer matchSeconds) {
        this.matchSeconds = matchSeconds;
    }

    public Integer getShotClockSeconds() {
        return shotClockSeconds;
    }

    public void setShotClockSeconds(Integer shotClockSeconds) {
        this.shotClockSeconds = shotClockSeconds;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(String startedAt) {
        this.startedAt = startedAt;
    }

    public String getEndedAt() {
        return endedAt;
    }

    public void setEndedAt(String endedAt) {
        this.endedAt = endedAt;
    }

    public Long getCreatedByOfficialId() {
        return createdByOfficialId;
    }

    public void setCreatedByOfficialId(Long createdByOfficialId) {
        this.createdByOfficialId = createdByOfficialId;
    }

    public List<MatchEventRequest> getEvents() {
        return events;
    }

    public void setEvents(List<MatchEventRequest> events) {
        this.events = events;
    }

    public List<MatchPlayerStatRequest> getPlayerStats() {
        return playerStats;
    }

    public void setPlayerStats(List<MatchPlayerStatRequest> playerStats) {
        this.playerStats = playerStats;
    }
}