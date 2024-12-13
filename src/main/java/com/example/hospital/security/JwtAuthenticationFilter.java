package com.example.hospital.security;

import com.example.hospital.logging.LogEvent;
import com.example.hospital.logging.LogService;
import com.example.hospital.logging.SuspiciousPatternDetector;
import com.example.hospital.model.User;
import com.example.hospital.model.UserSession;
import com.example.hospital.service.UserDetailServiceImpl;
import com.example.hospital.service.UserSessionService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.OffsetDateTime;
import java.util.Map;

@Component
@AllArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final UserDetailServiceImpl userDetailService;
    private final JwtUtils jwtUtils;
    private final LogService logService;
    private final UserSessionService userSessionService;
    private final SuspiciousPatternDetector suspiciousPatternDetector = new SuspiciousPatternDetector();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String requestTokenHeader = request.getHeader("Authorization");
        String username = null;
        String jwtToken = null;
        long startTime = System.currentTimeMillis();

        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);

            try {
                username = this.jwtUtils.extractUsername(jwtToken);
            } catch (ExpiredJwtException e) {
                logError(request, response, "JWT token has expired", e);
            } catch (Exception e) {
                logError(request, response, "Error validating JWT token", e);
            }
        }
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            final UserDetails userDetails = this.userDetailService.loadUserByUsername(username);

            if (this.jwtUtils.validateToken(jwtToken, userDetails)) {
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                trackUserActivity(request, username);
            }
        }
        User user = username != null ? userDetailService.getByUsername(username) : null;
        if (!inspectForSuspiciousInput(request, user != null ? user.getId() : null)) {
            logRequestDetails(request, request.getRemoteAddr(), user != null ? user.getId() : null);
        }
        filterChain.doFilter(request, response);
        logResponseDetails(response, request, user != null ? user.getId() : null, startTime);
    }

    private boolean inspectForSuspiciousInput(HttpServletRequest request, Long userId) {
        String userAgent = request.getHeader("User-Agent");
        String requestMethod = request.getMethod();
        StringBuilder suspiciousDetails = new StringBuilder();

        for (Map.Entry<String, String[]> entry : request.getParameterMap().entrySet()) {
            for (String paramValue : entry.getValue()) {
                if (suspiciousPatternDetector.isSuspicious(paramValue)) {
                    suspiciousDetails.append("Detected in parameter: ").append(entry.getKey())
                            .append(" = ").append(paramValue);
                }
            }
        }

        if ("POST".equalsIgnoreCase(requestMethod) || "PUT".equalsIgnoreCase(requestMethod)) {
            String requestBody = getRequestBody(new ContentCachingRequestWrapper(request));
            if (requestBody != null && suspiciousPatternDetector.isSuspicious(requestBody)) {
                suspiciousDetails.append("Suspicious body content detected: ").append(requestBody).append("\n");
            }
        }

        if (suspiciousDetails.length() > 0) {
            String clientIp = request.getRemoteAddr();
            String event = "Suspicious Input Detected";
            logService.logEvent(new LogEvent(
                    clientIp,
                    userId,
                    request.getRequestURI(),
                    request.getProtocol(),
                    "unknown",
                    event,
                    request.getContentLength(),
                    0,
                    "N/A",
                    0,
                    null,
                    userAgent,
                    requestMethod,
                    suspiciousDetails.toString() 
            ));
            return true;
        }
        return false;
    }


    private String getRequestBody(ContentCachingRequestWrapper wrappedRequest) {
        byte[] requestBodyBytes = wrappedRequest.getContentAsByteArray();
        return new String(requestBodyBytes, StandardCharsets.UTF_8);
    }


    private void logRequestDetails(HttpServletRequest request, String clientIp, Long userId) {
        String protocol = request.getProtocol();
        String location = GeolocationService.getLocation(clientIp);
        String event = "Request";
        int requestDataSize = request.getContentLength();
        String userAgent = request.getHeader("User-Agent");
        String referer = request.getHeader("Referer");

        LogEvent logEvent = new LogEvent(
                clientIp,
                userId,
                request.getRequestURI(),
                protocol,
                location,
                event,
                requestDataSize,
                0, 
                "N/A",
                0,
                "N/A",
                "User-Agent: " + userAgent,
                request.getMethod(),
                "N/A"
        );

        logService.logEvent(logEvent);
    }

    private void logResponseDetails(HttpServletResponse response, HttpServletRequest request, Long userName, long startTime) {
        String clientIp = request.getRemoteAddr();
        String protocol = request.getMethod();
        String location = GeolocationService.getLocation(clientIp);
        String event = "Response";
        int requestDataSize = request.getContentLength();
        int responseDataSize = response.getBufferSize();
        String userAgent = request.getHeader("User-Agent");
        int statusCode = response.getStatus();
        long responseTime = System.currentTimeMillis() - startTime;

        LogEvent logEvent = new LogEvent(
                clientIp,
                userName,
                request.getRequestURI(),
                protocol,
                location,
                event,
                requestDataSize,
                responseDataSize,
                String.valueOf(statusCode),
                responseTime,
                "N/A",
                "User-Agent: " + userAgent,
                request.getMethod(),
                response.getStatus() == 401 ? "Failed login attempt" : "N/A"
        );

        logService.logEvent(logEvent);
    }

    private void logError(HttpServletRequest request, HttpServletResponse response, String message, Exception e) {
        String clientIp = request.getRemoteAddr();
        String protocol = request.getProtocol();
        String event = "Response Error";
        String location = GeolocationService.getLocation(clientIp);
        String userAgent = request.getHeader("User-Agent");
        String requestMethod = request.getMethod();
        Long userId = null;
        LogEvent errorLogEvent = new LogEvent(
                clientIp,
                userId,
                request.getRequestURI(),
                protocol,
                location,
                event,
                request.getContentLength(),
                0,
                "500",
                0,
                "N/A",
                userAgent,
                requestMethod,
                message 
        );

        logService.logEvent(errorLogEvent);

        if (e != null) {
            e.printStackTrace();
        }
    }


    private void trackUserActivity(HttpServletRequest request, String userName) {
        UserSession activeSession = userSessionService.findActiveSessionByUserLogin(userName);
        if (activeSession != null) {
            String activity = "Accessed: " + request.getRequestURI();
            activeSession.setActivityLog(activeSession.getActivityLog() + "\n" + activity);
            activeSession.setEndTime(OffsetDateTime.now());
            userSessionService.updateSession(activeSession);
        }
    }
}
