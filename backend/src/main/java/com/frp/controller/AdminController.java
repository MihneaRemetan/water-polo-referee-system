package com.frp.controller;

import com.frp.model.Observer;
import com.frp.model.Referee;
import com.frp.model.Role;
import com.frp.model.User;
import com.frp.repository.ObserverRepository;
import com.frp.repository.RefereeRepository;
import com.frp.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final RefereeRepository refereeRepository;
    private final ObserverRepository observerRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminController(RefereeRepository refereeRepository,
                           ObserverRepository observerRepository,
                           UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.refereeRepository = refereeRepository;
        this.observerRepository = observerRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/check")
    public ResponseEntity<String> checkAdminAccess() {
        return ResponseEntity.ok("Admin access granted.");
    }

    // =========================
    // REFEREES
    // =========================

    @GetMapping("/referees")
    public List<Referee> getAllReferees() {
        return refereeRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Referee::getId))
                .toList();
    }

    @PostMapping("/referees")
    public ResponseEntity<?> createReferee(@RequestBody Referee referee) {
        if (referee.getId() == null) {
            return ResponseEntity.badRequest().body("Referee ID is required.");
        }

        if (referee.getName() == null || referee.getName().isBlank()) {
            return ResponseEntity.badRequest().body("Referee name is required.");
        }

        if (referee.getPassword() == null || referee.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body("Password is required.");
        }

        if (refereeRepository.existsById(referee.getId())) {
            return ResponseEntity.badRequest().body("A referee with this ID already exists.");
        }

        String userId = String.valueOf(referee.getId());
        if (userRepository.existsByUserId(userId)) {
            return ResponseEntity.badRequest().body("A user with this ID already exists.");
        }

        Referee savedReferee = refereeRepository.save(referee);

        User user = new User();
        user.setUserId(userId);
        user.setPassword(passwordEncoder.encode(referee.getPassword()));
        user.setRole(Role.REFEREE);
        userRepository.save(user);

        return ResponseEntity.ok(savedReferee);
    }

    @PutMapping("/referees/{id}")
    public ResponseEntity<?> updateReferee(@PathVariable Integer id, @RequestBody Referee refereeRequest) {
        Referee existingReferee = refereeRepository.findById(id).orElse(null);
        if (existingReferee == null) {
            return ResponseEntity.notFound().build();
        }

        existingReferee.setName(refereeRequest.getName());
        existingReferee.setCity(refereeRequest.getCity());
        existingReferee.setGender(refereeRequest.getGender());
        existingReferee.setRank(refereeRequest.getRank());

        if (refereeRequest.getPassword() != null && !refereeRequest.getPassword().isBlank()) {
            existingReferee.setPassword(refereeRequest.getPassword());

            userRepository.findByUserId(String.valueOf(id)).ifPresent(user -> {
                user.setPassword(passwordEncoder.encode(refereeRequest.getPassword()));
                userRepository.save(user);
            });
        }

        Referee updatedReferee = refereeRepository.save(existingReferee);
        return ResponseEntity.ok(updatedReferee);
    }

    @DeleteMapping("/referees/{id}")
    public ResponseEntity<?> deleteReferee(@PathVariable Integer id) {
        Referee existingReferee = refereeRepository.findById(id).orElse(null);
        if (existingReferee == null) {
            return ResponseEntity.notFound().build();
        }

        refereeRepository.deleteById(id);

        userRepository.findByUserId(String.valueOf(id))
                .ifPresent(userRepository::delete);

        return ResponseEntity.ok("Referee deleted successfully.");
    }

    // =========================
    // OBSERVERS
    // =========================

    @GetMapping("/observers")
    public List<Observer> getAllObservers() {
        return observerRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Observer::getId))
                .toList();
    }

    @PostMapping("/observers")
    public ResponseEntity<?> createObserver(@RequestBody Observer observer) {
        if (observer.getId() == null) {
            return ResponseEntity.badRequest().body("Observer ID is required.");
        }

        if (observer.getName() == null || observer.getName().isBlank()) {
            return ResponseEntity.badRequest().body("Observer name is required.");
        }

        if (observer.getPassword() == null || observer.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body("Password is required.");
        }

        if (observerRepository.existsById(observer.getId())) {
            return ResponseEntity.badRequest().body("An observer with this ID already exists.");
        }

        String userId = String.valueOf(observer.getId());
        if (userRepository.existsByUserId(userId)) {
            return ResponseEntity.badRequest().body("A user with this ID already exists.");
        }

        Observer savedObserver = observerRepository.save(observer);

        User user = new User();
        user.setUserId(userId);
        user.setPassword(passwordEncoder.encode(observer.getPassword()));
        user.setRole(Role.OBSERVER);
        userRepository.save(user);

        return ResponseEntity.ok(savedObserver);
    }

    @PutMapping("/observers/{id}")
    public ResponseEntity<?> updateObserver(@PathVariable Integer id, @RequestBody Observer observerRequest) {
        Observer existingObserver = observerRepository.findById(id).orElse(null);
        if (existingObserver == null) {
            return ResponseEntity.notFound().build();
        }

        existingObserver.setName(observerRequest.getName());
        existingObserver.setCity(observerRequest.getCity());
        existingObserver.setGender(observerRequest.getGender());
        existingObserver.setRank(observerRequest.getRank());

        if (observerRequest.getPassword() != null && !observerRequest.getPassword().isBlank()) {
            existingObserver.setPassword(observerRequest.getPassword());

            userRepository.findByUserId(String.valueOf(id)).ifPresent(user -> {
                user.setPassword(passwordEncoder.encode(observerRequest.getPassword()));
                userRepository.save(user);
            });
        }

        Observer updatedObserver = observerRepository.save(existingObserver);
        return ResponseEntity.ok(updatedObserver);
    }

    @DeleteMapping("/observers/{id}")
    public ResponseEntity<?> deleteObserver(@PathVariable Integer id) {
        Observer existingObserver = observerRepository.findById(id).orElse(null);
        if (existingObserver == null) {
            return ResponseEntity.notFound().build();
        }

        observerRepository.deleteById(id);

        userRepository.findByUserId(String.valueOf(id))
                .ifPresent(userRepository::delete);

        return ResponseEntity.ok("Observer deleted successfully.");
    }
}