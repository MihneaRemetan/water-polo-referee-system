package com.frp.config;

import com.frp.model.Observer;
import com.frp.model.Referee;
import com.frp.model.Role;
import com.frp.model.User;
import com.frp.repository.ObserverRepository;
import com.frp.repository.RefereeRepository;
import com.frp.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class AdminSeeder {

    private static final String ADMIN_USER_ID = "frp.admin";
    private static final String ADMIN_PASSWORD = "FrpAdmin_2026!Secure";

    @Bean
    public CommandLineRunner seedUsers(UserRepository userRepository,
                                       RefereeRepository refereeRepository,
                                       ObserverRepository observerRepository,
                                       PasswordEncoder passwordEncoder) {
        return args -> {
            if (!userRepository.existsByUserId(ADMIN_USER_ID)) {
                User admin = new User();
                admin.setUserId(ADMIN_USER_ID);
                admin.setPassword(passwordEncoder.encode(ADMIN_PASSWORD));
                admin.setRole(Role.ADMIN);

                userRepository.save(admin);
                System.out.println("Admin created: userId=" + ADMIN_USER_ID);
            }

            List<Referee> referees = refereeRepository.findAll();

            for (Referee referee : referees) {
                String refereeUserId = String.valueOf(referee.getId());

                if (!userRepository.existsByUserId(refereeUserId)) {
                    if (referee.getPassword() == null || referee.getPassword().isBlank()) {
                        System.out.println("Skipped referee " + refereeUserId + " because password is empty.");
                        continue;
                    }

                    User refereeUser = new User();
                    refereeUser.setUserId(refereeUserId);
                    refereeUser.setPassword(passwordEncoder.encode(referee.getPassword()));
                    refereeUser.setRole(Role.REFEREE);

                    userRepository.save(refereeUser);
                    System.out.println("Referee user created: userId=" + refereeUserId);
                }
            }

            List<Observer> observers = observerRepository.findAll();

            for (Observer observer : observers) {
                String observerUserId = String.valueOf(observer.getId());

                if (!userRepository.existsByUserId(observerUserId)) {
                    if (observer.getPassword() == null || observer.getPassword().isBlank()) {
                        System.out.println("Skipped observer " + observerUserId + " because password is empty.");
                        continue;
                    }

                    User observerUser = new User();
                    observerUser.setUserId(observerUserId);
                    observerUser.setPassword(passwordEncoder.encode(observer.getPassword()));
                    observerUser.setRole(Role.OBSERVER);

                    userRepository.save(observerUser);
                    System.out.println("Observer user created: userId=" + observerUserId);
                }
            }
        };
    }
}