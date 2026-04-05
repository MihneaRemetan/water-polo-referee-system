package com.frp.dto;

public class AuthRequest {
    private String userId;
    private String password;

    public AuthRequest() {
    }

    public AuthRequest(String userId, String password) {
        this.userId = userId;
        this.password = password;
    }

    public String getUserId() {
        return userId;
    }

    public String getPassword() {
        return password;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}