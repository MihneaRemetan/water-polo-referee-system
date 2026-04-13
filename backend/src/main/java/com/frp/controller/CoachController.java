package com.frp.controller;

import com.frp.model.Coach;
import com.frp.repository.CoachRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coaches")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CoachController {

    private final CoachRepository coachRepository;

    public CoachController(CoachRepository coachRepository) {
        this.coachRepository = coachRepository;
    }

    @GetMapping
    public List<Coach> getAllCoaches() {
        return coachRepository.findAllByOrderByNameAsc();
    }

    @GetMapping("/team/{teamId}")
    public List<Coach> getCoachesByTeam(@PathVariable Long teamId) {
        return coachRepository.findByTeamIdOrderByNameAsc(teamId);
    }
}