package com.frp.repository;

import com.frp.model.Role;
import com.frp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserId(String userId);
    boolean existsByRole(Role role);
    boolean existsByUserId(String userId);
}