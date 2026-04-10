package com.frp.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "team_a_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Team teamA;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "team_b_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Team teamB;

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

    public Team getTeamA() {
        return teamA;
    }

    public void setTeamA(Team teamA) {
        this.teamA = teamA;
    }

    public Team getTeamB() {
        return teamB;
    }

    public void setTeamB(Team teamB) {
        this.teamB = teamB;
    }

    @Transient
    public String getTeamAName() {
        return teamA != null ? teamA.getName() : null;
    }

    @Transient
    public String getTeamBName() {
        return teamB != null ? teamB.getName() : null;
    }

    @Transient
    public String getTeamAShortName() {
        return teamA != null ? teamA.getShortName() : null;
    }

    @Transient
    public String getTeamBShortName() {
        return teamB != null ? teamB.getShortName() : null;
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