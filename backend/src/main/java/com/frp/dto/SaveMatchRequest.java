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

    private String refereeC1;
    private String refereeC2;
    private String secretary1;
    private String secretary2;
    private String timekeeper;
    private String refereeP1;
    private String refereeP2;
    private String observer;

    private String championship;
    private String matchDate;
    private String matchNumber;
    private String location;

    private List<MatchEventRequest> events;
    private List<MatchPlayerStatRequest> playerStats;

    public SaveMatchRequest() {}

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

    public String getRefereeC1() {
        return refereeC1;
    }

    public void setRefereeC1(String refereeC1) {
        this.refereeC1 = refereeC1;
    }

    public String getRefereeC2() {
        return refereeC2;
    }

    public void setRefereeC2(String refereeC2) {
        this.refereeC2 = refereeC2;
    }

    public String getSecretary1() {
        return secretary1;
    }

    public void setSecretary1(String secretary1) {
        this.secretary1 = secretary1;
    }

    public String getSecretary2() {
        return secretary2;
    }

    public void setSecretary2(String secretary2) {
        this.secretary2 = secretary2;
    }

    public String getTimekeeper() {
        return timekeeper;
    }

    public void setTimekeeper(String timekeeper) {
        this.timekeeper = timekeeper;
    }

    public String getRefereeP1() {
        return refereeP1;
    }

    public void setRefereeP1(String refereeP1) {
        this.refereeP1 = refereeP1;
    }

    public String getRefereeP2() {
        return refereeP2;
    }

    public void setRefereeP2(String refereeP2) {
        this.refereeP2 = refereeP2;
    }

    public String getObserver() {
        return observer;
    }

    public void setObserver(String observer) {
        this.observer = observer;
    }

    public String getChampionship() {
        return championship;
    }

    public void setChampionship(String championship) {
        this.championship = championship;
    }

    public String getMatchDate() {
        return matchDate;
    }

    public void setMatchDate(String matchDate) {
        this.matchDate = matchDate;
    }

    public String getMatchNumber() {
        return matchNumber;
    }

    public void setMatchNumber(String matchNumber) {
        this.matchNumber = matchNumber;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
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