package com.frp.repository;

import com.frp.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    boolean existsByPlayerCode(String playerCode);
    Optional<Player> findByPlayerCode(String playerCode);
    List<Player> findByTeamIdOrderByNumberAsc(Long teamId);
}