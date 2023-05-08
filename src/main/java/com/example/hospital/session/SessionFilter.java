package com.example.hospital.session;

import com.example.hospital.model.CurrentUser;
import com.example.hospital.service.CurrentUserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SessionFilter extends OncePerRequestFilter {
    private final InMemorySessionRegistry sessionRegistry;
    private final CurrentUserService currentUserService;

    @Autowired
    public SessionFilter(InMemorySessionRegistry sessionRegistry, CurrentUserService currentUserService) {
        this.sessionRegistry = sessionRegistry;
        this.currentUserService = currentUserService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
       final String sessionId = request.getHeader(HttpHeaders.AUTHORIZATION);
       if(sessionId == null || sessionId.length() == 0) {
           filterChain.doFilter(request,response);
           return;

       }

       final String username = sessionRegistry.getUsernameForSession(sessionId);
       if(username == null) {
           filterChain.doFilter(request,response);
            return;
       }
        final CurrentUser currentUser = currentUserService.loadUserByUsername(username);

       final UsernamePasswordAuthenticationToken auth= new UsernamePasswordAuthenticationToken(
               currentUser,
               null,
               currentUser.getAuthorities()
       );
       auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
       SecurityContextHolder.getContext().setAuthentication(auth);
       filterChain.doFilter(request, response);
    }
}
