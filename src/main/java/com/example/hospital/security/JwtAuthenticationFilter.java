package com.example.hospital.security;

import com.example.hospital.model.User;
import com.example.hospital.service.UserDetailServiceImpl;
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

import java.io.IOException;

@Component
@AllArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final UserDetailServiceImpl userDetailService;
    private final JwtUtils jwtUtils;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String requestTokenHeader = request.getHeader("Authorization");
        System.out.println(requestTokenHeader);
        String username = null;
        String jwtToken = null;

        if(requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {

            jwtToken = requestTokenHeader.substring(7);

            try {
                username = this.jwtUtils.extractUsername(jwtToken);
            }catch (ExpiredJwtException e){
                e.printStackTrace();
                System.out.println("Jwt token has expired");
            }catch (Exception e){
                e.printStackTrace();
                System.out.println("error");
            }

        } else {
            System.out.println("Token:"+jwtToken);
            System.out.println("Invalid token, not starts with bearer string");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            final UserDetails userDetails = this.userDetailService.loadUserByUsername(username);
            if (this.jwtUtils.validateToken(jwtToken,userDetails)){
                //token is vali
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }else  {
            System.out.println("Token is not valid!");
        }

        filterChain.doFilter(request,response);

    }
}
