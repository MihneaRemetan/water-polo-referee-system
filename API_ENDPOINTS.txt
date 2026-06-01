http://localhost:8080

# HealthController
GET /api/health

# AuthController
POST /api/auth/login
{
  "userId": "frp.admin",
  "password": "FrpAdmin_2026!Secure"
}

GET /api/auth/me
POST /api/auth/logout

# AdminController
GET /api/admin/check

## Referees
GET /api/admin/referees
POST /api/admin/referees
PUT /api/admin/referees/{id}
DELETE /api/admin/referees/{id}

## Observers
GET /api/admin/observers
POST /api/admin/observers
PUT /api/admin/observers/{id}
DELETE /api/admin/observers/{id}

# CoachController
GET /api/coaches
GET /api/coaches/team/{teamId}

# MatchController
GET /api/matches
GET /api/matches/history
GET /api/matches/standings
GET /api/matches/{id}
POST /api/matches

# PlayerController
GET /api/players
GET /api/players/{id}
POST /api/players
PUT /api/players/{id}
DELETE /api/players/{id}

# StatisticsController
GET /api/statistics/players

# TeamController
GET /api/teams
GET /api/teams/{id}
POST /api/teams
PUT /api/teams/{id}
DELETE /api/teams/{id}