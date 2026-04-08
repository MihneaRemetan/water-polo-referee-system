package com.frp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "observer")
public class Observer {

    @Id
    private Integer id;

    private String name;
    private String city;
    private String gender;

    @Column(name = "observer_rank")
    private String rank;

    private String password;

    public Observer() {
    }

    public Observer(Integer id, String name, String city, String gender, String rank, String password) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.gender = gender;
        this.rank = rank;
        this.password = password;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}