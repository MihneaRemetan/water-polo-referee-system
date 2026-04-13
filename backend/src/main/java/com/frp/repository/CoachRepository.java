package com.frp.repository;

import com.frp.model.Coach;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CoachRepository extends JpaRepository<Coach, Long> {
    List<Coach> findAllByOrderByNameAsc();
    List<Coach> findByTeamIdOrderByNameAsc(Long teamId);
    Optional<Coach> findByCoachCode(String coachCode);
}