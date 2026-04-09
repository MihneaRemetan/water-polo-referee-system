package com.frp.dto;

public class PlayerStatisticsDto {

    private String playerName;
    private String team;
    private Integer playerNumber;
    private Integer matchesPlayed;
    private Integer totalGoals;
    private Integer totalFouls;
    private Integer totalYellowCards;
    private Integer totalRedCards;
    private Integer totalExclusions;
    private Double goalsPerMatch;
    private Double foulsPerMatch;

    public PlayerStatisticsDto() {
    }

    public PlayerStatisticsDto(
            String playerName,
            String team,
            Integer playerNumber,
            Integer matchesPlayed,
            Integer totalGoals,
            Integer totalFouls,
            Integer totalYellowCards,
            Integer totalRedCards,
            Integer totalExclusions,
            Double goalsPerMatch,
            Double foulsPerMatch
    ) {
        this.playerName = playerName;
        this.team = team;
        this.playerNumber = playerNumber;
        this.matchesPlayed = matchesPlayed;
        this.totalGoals = totalGoals;
        this.totalFouls = totalFouls;
        this.totalYellowCards = totalYellowCards;
        this.totalRedCards = totalRedCards;
        this.totalExclusions = totalExclusions;
        this.goalsPerMatch = goalsPerMatch;
        this.foulsPerMatch = foulsPerMatch;
    }

    public String getPlayerName() {
        return playerName;
    }

    public String getTeam() {
        return team;
    }

    public Integer getPlayerNumber() {
        return playerNumber;
    }

    public Integer getMatchesPlayed() {
        return matchesPlayed;
    }

    public Integer getTotalGoals() {
        return totalGoals;
    }

    public Integer getTotalFouls() {
        return totalFouls;
    }

    public Integer getTotalYellowCards() {
        return totalYellowCards;
    }

    public Integer getTotalRedCards() {
        return totalRedCards;
    }

    public Integer getTotalExclusions() {
        return totalExclusions;
    }

    public Double getGoalsPerMatch() {
        return goalsPerMatch;
    }

    public Double getFoulsPerMatch() {
        return foulsPerMatch;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public void setPlayerNumber(Integer playerNumber) {
        this.playerNumber = playerNumber;
    }

    public void setMatchesPlayed(Integer matchesPlayed) {
        this.matchesPlayed = matchesPlayed;
    }

    public void setTotalGoals(Integer totalGoals) {
        this.totalGoals = totalGoals;
    }

    public void setTotalFouls(Integer totalFouls) {
        this.totalFouls = totalFouls;
    }

    public void setTotalYellowCards(Integer totalYellowCards) {
        this.totalYellowCards = totalYellowCards;
    }

    public void setTotalRedCards(Integer totalRedCards) {
        this.totalRedCards = totalRedCards;
    }

    public void setTotalExclusions(Integer totalExclusions) {
        this.totalExclusions = totalExclusions;
    }

    public void setGoalsPerMatch(Double goalsPerMatch) {
        this.goalsPerMatch = goalsPerMatch;
    }

    public void setFoulsPerMatch(Double foulsPerMatch) {
        this.foulsPerMatch = foulsPerMatch;
    }
}