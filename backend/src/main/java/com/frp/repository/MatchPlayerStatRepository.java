package com.frp.repository;

import com.frp.model.MatchPlayerStat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchPlayerStatRepository extends JpaRepository<MatchPlayerStat, Long> {
}