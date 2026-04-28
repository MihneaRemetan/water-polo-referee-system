package com.frp.dto;

import java.time.LocalDateTime;
import java.util.List;

public class MatchDetailsDto {

    private Long id;

    private String teamAName;
    private String teamBName;

    private Integer scoreA;
    private Integer scoreB;

    private String status;

    private LocalDateTime startedAt;
    private LocalDateTime endedAt;

    private String refereeC1;
    private String refereeC2;
    private String secretary1;
    private String secretary2;
    private String timekeeper;
    private String refereeP1;
    private String refereeP2;
    private String observer;

    private List<MatchEventRequest> events;
    private List<PlayerStatisticsDto> playerStats;

    public MatchDetailsDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTeamAName() {
        return teamAName;
    }

    public void setTeamAName(String teamAName) {
        this.teamAName = teamAName;
    }

    public String getTeamBName() {
        return teamBName;
    }

    public void setTeamBName(String teamBName) {
        this.teamBName = teamBName;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public LocalDateTime getEndedAt() {
        return endedAt;
    }

    public void setEndedAt(LocalDateTime endedAt) {
        this.endedAt = endedAt;
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

    public List<MatchEventRequest> getEvents() {
        return events;
    }

    public void setEvents(List<MatchEventRequest> events) {
        this.events = events;
    }

    public List<PlayerStatisticsDto> getPlayerStats() {
        return playerStats;
    }

    public void setPlayerStats(List<PlayerStatisticsDto> playerStats) {
        this.playerStats = playerStats;
    }
}