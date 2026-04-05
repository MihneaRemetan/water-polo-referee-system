package com.frp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "matches")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "team_a_name", nullable = false)
    private String teamAName;

    @Column(name = "team_b_name", nullable = false)
    private String teamBName;

    @Column(name = "score_a")
    private Integer scoreA;

    @Column(name = "score_b")
    private Integer scoreB;

    @Column(name = "period_number")
    private Integer period;

    @Column(name = "match_seconds")
    private Integer matchSeconds;

    @Column(name = "shot_clock_seconds")
    private Integer shotClockSeconds;

    @Column(nullable = false)
    private String status;

    @Column(name = "started_at")
    private LocalDateTime startedAt;

    @Column(name = "ended_at")
    private LocalDateTime endedAt;

    @Column(name = "created_by_official_id")
    private Long createdByOfficialId;

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MatchEvent> events = new ArrayList<>();

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MatchPlayerStat> playerStats = new ArrayList<>();

    public Match() {
    }

    public Long getId() {
        return id;
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

    public Long getCreatedByOfficialId() {
        return createdByOfficialId;
    }

    public void setCreatedByOfficialId(Long createdByOfficialId) {
        this.createdByOfficialId = createdByOfficialId;
    }

    public List<MatchEvent> getEvents() {
        return events;
    }

    public void setEvents(List<MatchEvent> events) {
        this.events = events;
    }

    public List<MatchPlayerStat> getPlayerStats() {
        return playerStats;
    }

    public void setPlayerStats(List<MatchPlayerStat> playerStats) {
        this.playerStats = playerStats;
    }

    public void addEvent(MatchEvent event) {
        events.add(event);
        event.setMatch(this);
    }

    public void addPlayerStat(MatchPlayerStat playerStat) {
        playerStats.add(playerStat);
        playerStat.setMatch(this);
    }
}