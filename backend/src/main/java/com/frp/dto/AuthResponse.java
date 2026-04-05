package com.frp.dto;

public class AuthResponse {
    private String userId;
    private String name;
    private String role;
    private boolean authenticated;

    public AuthResponse() {
    }

    public AuthResponse(String userId, String name, String role, boolean authenticated) {
        this.userId = userId;
        this.name = name;
        this.role = role;
        this.authenticated = authenticated;
    }

    public String getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getRole() {
        return role;
    }

    public boolean isAuthenticated() {
        return authenticated;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
    }
}