package com.frp.dto;

public class TeamStandingDto {

    private String teamName;
    private int matchesPlayed;
    private int wins;
    private int draws;
    private int losses;
    private int goalDifference;
    private int points;

    public TeamStandingDto() {
    }

    public TeamStandingDto(String teamName) {
        this.teamName = teamName;
        this.matchesPlayed = 0;
        this.wins = 0;
        this.draws = 0;
        this.losses = 0;
        this.goalDifference = 0;
        this.points = 0;
    }

    public String getTeamName() {
        return teamName;
    }

    public int getMatchesPlayed() {
        return matchesPlayed;
    }

    public int getWins() {
        return wins;
    }

    public int getDraws() {
        return draws;
    }

    public int getLosses() {
        return losses;
    }

    public int getGoalDifference() {
        return goalDifference;
    }

    public int getPoints() {
        return points;
    }

    public void addWin(int goalsScored, int goalsConceded) {
        this.matchesPlayed++;
        this.wins++;
        this.goalDifference += goalsScored - goalsConceded;
        this.points += 3;
    }

    public void addDraw(int goalsScored, int goalsConceded) {
        this.matchesPlayed++;
        this.draws++;
        this.goalDifference += goalsScored - goalsConceded;
        this.points += 1;
    }

    public void addLoss(int goalsScored, int goalsConceded) {
        this.matchesPlayed++;
        this.losses++;
        this.goalDifference += goalsScored - goalsConceded;
    }
}