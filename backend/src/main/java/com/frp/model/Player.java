package com.frp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "player_code", nullable = false, unique = true)
    private String playerCode;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer number;

    private String position;

    private String gender;

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    public Player() {
    }

    public Long getId() {
        return id;
    }

    public String getPlayerCode() {
        return playerCode;
    }

    public String getName() {
        return name;
    }

    public Integer getNumber() {
        return number;
    }

    public String getPosition() {
        return position;
    }

    public String getGender() {
        return gender;
    }

    public Team getTeam() {
        return team;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPlayerCode(String playerCode) {
        this.playerCode = playerCode;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setTeam(Team team) {
        this.team = team;
    }
}