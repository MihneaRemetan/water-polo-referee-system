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

    // 🔥 NOI
    private String referee1;
    private String referee2;
    private String observer;

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
            String referee1,
            String referee2,
            String observer
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
        this.referee1 = referee1;
        this.referee2 = referee2;
        this.observer = observer;
    }

    // getters
    public Long getId() { return id; }
    public String getTeamAName() { return teamAName; }
    public String getTeamBName() { return teamBName; }
    public Integer getScoreA() { return scoreA; }
    public Integer getScoreB() { return scoreB; }
    public Integer getPeriod() { return period; }
    public Integer getMatchSeconds() { return matchSeconds; }
    public Integer getShotClockSeconds() { return shotClockSeconds; }
    public String getStatus() { return status; }
    public LocalDateTime getStartedAt() { return startedAt; }
    public LocalDateTime getEndedAt() { return endedAt; }
    public Long getCreatedByOfficialId() { return createdByOfficialId; }

    public String getReferee1() { return referee1; }
    public String getReferee2() { return referee2; }
    public String getObserver() { return observer; }
}