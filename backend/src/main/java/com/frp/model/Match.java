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

    private Integer scoreA;
    private Integer scoreB;

    @Column(name = "period_number")
    private Integer period;

    private Integer matchSeconds;
    private Integer shotClockSeconds;

    private String status;

    private LocalDateTime startedAt;
    private LocalDateTime endedAt;

    private Long createdByOfficialId;

    // 🔥 NOI
    private String referee1;
    private String referee2;
    private String observer;

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MatchEvent> events = new ArrayList<>();

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MatchPlayerStat> playerStats = new ArrayList<>();

    public Match() {}

    public Long getId() { return id; }

    public Team getTeamA() { return teamA; }
    public void setTeamA(Team teamA) { this.teamA = teamA; }

    public Team getTeamB() { return teamB; }
    public void setTeamB(Team teamB) { this.teamB = teamB; }

    @Transient
    public String getTeamAName() { return teamA != null ? teamA.getName() : null; }

    @Transient
    public String getTeamBName() { return teamB != null ? teamB.getName() : null; }

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

    public LocalDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }

    public LocalDateTime getEndedAt() { return endedAt; }
    public void setEndedAt(LocalDateTime endedAt) { this.endedAt = endedAt; }

    public Long getCreatedByOfficialId() { return createdByOfficialId; }
    public void setCreatedByOfficialId(Long createdByOfficialId) { this.createdByOfficialId = createdByOfficialId; }

    public String getReferee1() { return referee1; }
    public void setReferee1(String referee1) { this.referee1 = referee1; }

    public String getReferee2() { return referee2; }
    public void setReferee2(String referee2) { this.referee2 = referee2; }

    public String getObserver() { return observer; }
    public void setObserver(String observer) { this.observer = observer; }

    public void addEvent(MatchEvent event) {
        events.add(event);
        event.setMatch(this);
    }

    public void addPlayerStat(MatchPlayerStat stat) {
        playerStats.add(stat);
        stat.setMatch(this);
    }
}