# Water Polo Referee System

A full-stack web application designed to support the management and monitoring of water polo matches.  
The platform helps officials organize matches, manage competition data, run live match sessions, record events, and review saved match history and player statistics.

## Overview

The **Water Polo Referee System** is built as a federation-style digital platform for match administration and live officiating support.

It includes:
- a **React + Vite frontend** for the user interface
- a **Spring Boot backend** exposing REST APIs
- a **MySQL database** for persistent storage of teams, players, coaches, officials, matches, events, and statistics

The goal of the project is to provide a centralized system where referees, observers, and administrators can work with match data in a structured and efficient way.

---

## Main Features

### Authentication and role-based access
- Login system for officials
- Session-based authentication
- Role separation for:
  - **ADMIN**
  - **REFEREE**
  - **OBSERVER**

### Match management
- Create and save matches
- Configure teams and match details
- Store:
  - team assignments
  - score
  - period
  - shot clock
  - referees and officials
  - championship details
  - location and date

### Live match workflow
- Start and run a live match session
- Track important in-game information
- Record match events and player statistics

### Administration module
- Manage referees
- Manage observers
- Control official access data

### Team and player management
- View teams
- Add, update, and delete teams
- View players
- Add, update, and delete players
- Automatically generate player codes when needed
- View coaches by team

### Match history and statistics
- View saved matches
- Review past match details
- Access aggregated player statistics
- Filter statistics by name, team, or player number

---

## Tech Stack

### Frontend
- **React**
- **Vite**
- **React Router DOM**
- **CSS**

### Backend
- **Java 17**
- **Spring Boot**
- **Spring Web**
- **Spring Data JPA**
- **Spring Security**
- **Spring Validation**
- **Lombok**

### Database
- **MySQL**

---

## Project Structure

```bash
water-polo-referee-system/
├── backend/      # Spring Boot backend
└── edge-app/     # React frontend