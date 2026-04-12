package com.frp.repository;

import com.frp.model.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Long> {

    @Query("""
        SELECT m
        FROM Match m
        JOIN FETCH m.teamA
        JOIN FETCH m.teamB
        ORDER BY m.id DESC
    """)
    List<Match> findAllWithTeams();
}