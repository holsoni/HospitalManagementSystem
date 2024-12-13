package com.example.hospital.service;

import com.example.hospital.logging.LogEvent;
import com.example.hospital.logging.LogService;
import com.example.hospital.model.UserSession;
import com.example.hospital.security.GeolocationService;
import com.example.hospital.security.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.UUID;

@Service
public class AuthService {
    @Autowired
    private AuthenticationManager manager;
    @Autowired
    private UserDetailServiceImpl userDetailService;
    @Autowired
    private UserSessionService userSessionService;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private LogService logService;

    public void authenticate(String username, String password) throws Exception {
        try {
            manager.authenticate(new UsernamePasswordAuthenticationToken(username,password));
            userDetailService.resetFailedAttempts(username);
        }
        catch (DisabledException e){
            throw new Exception("User [" + username + "] is disabled");
        }
        catch (BadCredentialsException e){
            userDetailService.updateFailedAttempts(username);
            throw new Exception("Invalid credentials "+ e.getMessage());
        }
    }

    public void logout(String token) {
        String userName = "";
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            userName = jwtUtils.extractUsername(token);
        }

        if (!userName.isEmpty()) {
            UserSession activeSession = userSessionService.findActiveSessionByUserLogin(userName);

            if (activeSession != null) {
                activeSession.setEndTime(OffsetDateTime.now());
                activeSession.setStatus("INACTIVE");
                activeSession.setActivityLog("Session ended");

                userSessionService.updateSession(activeSession);
            }
        }
    }

    private UserSession generateSession(HttpServletRequest request) {
        UserSession session = new UserSession();
        String token = request.getHeader("Authorization");
        String userName="";

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            userName = jwtUtils.extractUsername(token);
        }

        session.setUserLogin(userName);
        session.setSessionId(UUID.randomUUID());
        session.setStartTime(OffsetDateTime.now());
        session.setIpAddress(request.getRemoteAddr());
        session.setUserAgent(request.getHeader("User-Agent"));
        String currentLocation = GeolocationService.getLocation(request.getRemoteAddr());
        session.setLocation(currentLocation);
        session.setActivityLog("Session started"); // Initial activity log
        session.setStatus("ACTIVE");

        // Create the session in the database
        userSessionService.createSession(session);
        return session;
    }

    public void updateSession(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        String userName="";

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            userName = jwtUtils.extractUsername(token);
        }

        UserSession activeSession = userSessionService.findActiveSessionByUserLogin(userName);
        if (activeSession != null) {
            String newLocation = GeolocationService.getLocation(request.getRemoteAddr());

            // Check if the location has changed
            if (!newLocation.equals(activeSession.getLocation())) {
                activeSession.setLocationChanged(true);
                activeSession.setActivityLog(activeSession.getActivityLog() + "\nLocation changed to: " + newLocation);
                activeSession.setLocation(newLocation);
            }

            activeSession.setEndTime(OffsetDateTime.now());  // Update end time for activity
            userSessionService.updateSession(activeSession);
        }
    }



}
