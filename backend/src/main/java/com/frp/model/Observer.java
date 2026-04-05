package com.frp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Observer {

    @Id
    private Integer id;

    private String name;
    private String city;
    private String gender;

    @Column(name = "observer_rank")
    private String rank;

    @JsonIgnore
    private String password;

    public Observer() {
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCity() {
        return city;
    }

    public String getGender() {
        return gender;
    }

    public String getRank() {
        return rank;
    }

    public String getPassword() {
        return password;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}