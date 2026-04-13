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

    public MatchHistoryDto() {}

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
            Long createdByOfficialId,
            String refereeC1,
            String refereeC2,
            String secretary1,
            String secretary2,
            String timekeeper,
            String refereeP1,
            String refereeP2,
            String observer,
            String championship,
            String matchDate,
            String matchNumber,
            String location
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
        this.refereeC1 = refereeC1;
        this.refereeC2 = refereeC2;
        this.secretary1 = secretary1;
        this.secretary2 = secretary2;
        this.timekeeper = timekeeper;
        this.refereeP1 = refereeP1;
        this.refereeP2 = refereeP2;
        this.observer = observer;
        this.championship = championship;
        this.matchDate = matchDate;
        this.matchNumber = matchNumber;
        this.location = location;
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

    public String getRefereeC1() {
        return refereeC1;
    }

    public String getRefereeC2() {
        return refereeC2;
    }

    public String getSecretary1() {
        return secretary1;
    }

    public String getSecretary2() {
        return secretary2;
    }

    public String getTimekeeper() {
        return timekeeper;
    }

    public String getRefereeP1() {
        return refereeP1;
    }

    public String getRefereeP2() {
        return refereeP2;
    }

    public String getObserver() {
        return observer;
    }

    public String getChampionship() {
        return championship;
    }

    public String getMatchDate() {
        return matchDate;
    }

    public String getMatchNumber() {
        return matchNumber;
    }

    public String getLocation() {
        return location;
    }
}