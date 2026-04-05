package com.frp.dto;

import java.time.LocalDateTime;

public class MatchHistoryDto {

    private Long id;
    private String teamAName;
    private String teamBName;
    private Integer scoreA;
    private Integer scoreB;
    private Integer period;
    private Integer matchSeconds;
    private Integer shotClockSeconds;
    private String status;
    private LocalDateTime startedAt;
    private LocalDateTime endedAt;
    private Long createdByOfficialId;

    public MatchHistoryDto() {
    }

    public MatchHistoryDto(
            Long id,
            String teamAName,
            String teamBName,
            Integer scoreA,
            Integer scoreB,
            Integer period,
            Integer matchSeconds,
            Integer shotClockSeconds,
            String status,
            LocalDateTime startedAt,
            LocalDateTime endedAt,
            Long createdByOfficialId
    ) {
        this.id = id;
        this.teamAName = teamAName;
        this.teamBName = teamBName;
        this.scoreA = scoreA;
        this.scoreB = scoreB;
        this.period = period;
        this.matchSeconds = matchSeconds;
        this.shotClockSeconds = shotClockSeconds;
        this.status = status;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.createdByOfficialId = createdByOfficialId;
    }

    public Long getId() {
        return id;
    }

    public String getTeamAName() {
        return teamAName;
    }

    public String getTeamBName() {
        return teamBName;
    }

    public Integer getScoreA() {
        return scoreA;
    }

    public Integer getScoreB() {
        return scoreB;
    }

    public Integer getPeriod() {
        return period;
    }

    public Integer getMatchSeconds() {
        return matchSeconds;
    }

    public Integer getShotClockSeconds() {
        return shotClockSeconds;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public LocalDateTime getEndedAt() {
        return endedAt;
    }

    public Long getCreatedByOfficialId() {
        return createdByOfficialId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTeamAName(String teamAName) {
        this.teamAName = teamAName;
    }

    public void setTeamBName(String teamBName) {
        this.teamBName = teamBName;
    }

    public void setScoreA(Integer scoreA) {
        this.scoreA = scoreA;
    }

    public void setScoreB(Integer scoreB) {
        this.scoreB = scoreB;
    }

    public void setPeriod(Integer period) {
        this.period = period;
    }

    public void setMatchSeconds(Integer matchSeconds) {
        this.matchSeconds = matchSeconds;
    }

    public void setShotClockSeconds(Integer shotClockSeconds) {
        this.shotClockSeconds = shotClockSeconds;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public void setEndedAt(LocalDateTime endedAt) {
        this.endedAt = endedAt;
    }

    public void setCreatedByOfficialId(Long createdByOfficialId) {
        this.createdByOfficialId = createdByOfficialId;
    }
}