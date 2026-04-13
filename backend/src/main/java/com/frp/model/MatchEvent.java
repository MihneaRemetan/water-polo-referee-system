package com.frp.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "match_events")
public class MatchEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 10)
    private String team;

    @Column(name = "player_number")
    private Integer playerNumber;

    @Column(name = "player_name")
    private String playerName;

    @Column(name = "event_type", nullable = false)
    private String eventType;

    @Column(name = "event_time_seconds")
    private Integer eventTimeSeconds;

    @Column(name = "period_number")
    private Integer period;

    @Column(columnDefinition = "TEXT")
    private String details;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "match_id", nullable = false)
    @JsonBackReference
    private Match match;

    public MatchEvent() {
    }

    public Long getId() {
        return id;
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

    public Match getMatch() {
        return match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }
}