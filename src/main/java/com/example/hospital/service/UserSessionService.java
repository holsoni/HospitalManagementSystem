package com.example.hospital.service;

import com.example.hospital.model.UserSession;
import com.example.hospital.repository.UserSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class UserSessionService {

    private final UserSessionRepository userSessionRepository;

    @Autowired
    public UserSessionService(UserSessionRepository userSessionRepository) {
        this.userSessionRepository = userSessionRepository;
    }

    public UserSession createSession(UserSession session) {
        return userSessionRepository.save(session);
    }

    public List<UserSession> getAllActiveSessions() {
        return userSessionRepository.findAll(); // You can add a filter for active sessions if needed
    }

    public UserSession findActiveSessionByUserLogin(String userLogin) {
        return userSessionRepository.findByUserLoginAndStatus(userLogin, "ACTIVE");
    }

    public void updateSession(UserSession session) {
        userSessionRepository.save(session);
    }

    public void endSession(UUID sessionId) {
        UserSession session = userSessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Session not found"));
        session.setStatus("closed");
        session.setEndTime(OffsetDateTime.now());
        userSessionRepository.save(session);
    }
}
