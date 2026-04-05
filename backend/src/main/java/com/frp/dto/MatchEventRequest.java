package com.frp.dto;

public class MatchEventRequest {

    private String team;
    private Integer playerNumber;
    private String playerName;
    private String eventType;
    private Integer eventTimeSeconds;
    private Integer period;
    private String details;

    public MatchEventRequest() {
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public Integer getPlayerNumber() {
        return playerNumber;
    }

    public void setPlayerNumber(Integer playerNumber) {
        this.playerNumber = playerNumber;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public Integer getEventTimeSeconds() {
        return eventTimeSeconds;
    }

    public void setEventTimeSeconds(Integer eventTimeSeconds) {
        this.eventTimeSeconds = eventTimeSeconds;
    }

    public Integer getPeriod() {
        return period;
    }

    public void setPeriod(Integer period) {
        this.period = period;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}