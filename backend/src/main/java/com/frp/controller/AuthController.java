package com.frp.controller;

import com.frp.dto.AuthRequest;
import com.frp.dto.AuthResponse;
import com.frp.model.Observer;
import com.frp.model.Referee;
import com.frp.model.User;
import com.frp.repository.ObserverRepository;
import com.frp.repository.RefereeRepository;
import com.frp.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RefereeRepository refereeRepository;
    private final ObserverRepository observerRepository;

    public AuthController(AuthenticationManager authenticationManager,
                          UserRepository userRepository,
                          RefereeRepository refereeRepository,
                          ObserverRepository observerRepository) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.refereeRepository = refereeRepository;
        this.observerRepository = observerRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request, HttpServletRequest httpRequest) {
        String userId = request.getUserId() != null ? request.getUserId().trim() : "";
        String password = request.getPassword() != null ? request.getPassword().trim() : "";

        if (userId.isEmpty() || password.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("User ID and password are required."));
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userId, password)
            );

            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authentication);
            SecurityContextHolder.setContext(context);

            HttpSession session = httpRequest.getSession(true);
            session.setAttribute(
                    HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                    context
            );

            User user = userRepository.findByUserId(userId).orElseThrow();
            String name = getDisplayName(user);

            return ResponseEntity.ok(
                    new AuthResponse(user.getUserId(), name, user.getRole().name(), true)
            );

        } catch (AuthenticationException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Invalid user ID or password."));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Not authenticated."));
        }

        String userId = authentication.getName();
        Optional<User> userOpt = userRepository.findByUserId(userId);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Not authenticated."));
        }

        User user = userOpt.get();
        String name = getDisplayName(user);

        return ResponseEntity.ok(
                new AuthResponse(user.getUserId(), name, user.getRole().name(), true)
        );
    }

    private String getDisplayName(User user) {
        if ("REFEREE".equals(user.getRole().name())) {
            try {
                Integer refereeId = Integer.parseInt(user.getUserId());
                Optional<Referee> refereeOpt = refereeRepository.findById(refereeId);
                if (refereeOpt.isPresent() && refereeOpt.get().getName() != null && !refereeOpt.get().getName().isBlank()) {
                    return refereeOpt.get().getName();
                }
                return "Referee";
            } catch (NumberFormatException e) {
                return "Referee";
            }
        }

        if ("OBSERVER".equals(user.getRole().name())) {
            try {
                Integer observerId = Integer.parseInt(user.getUserId());
                Optional<Observer> observerOpt = observerRepository.findById(observerId);
                if (observerOpt.isPresent() && observerOpt.get().getName() != null && !observerOpt.get().getName().isBlank()) {
                    return observerOpt.get().getName();
                }
                return "Observer";
            } catch (NumberFormatException e) {
                return "Observer";
            }
        }

        if ("ADMIN".equals(user.getRole().name())) {
            return "Administrator";
        }

        return "User";
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }

        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(new MessageResponse("Logged out successfully."));
    }

    public static class ErrorResponse {
        private String message;

        public ErrorResponse() {
        }

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    public static class MessageResponse {
        private String message;

        public MessageResponse() {
        }

        public MessageResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}