package com.example.hospital.controller.rest;

import com.example.hospital.dto.JwtDTO;
import com.example.hospital.dto.JwtRequest;
import com.example.hospital.model.User;
import com.example.hospital.model.UserSession;
import com.example.hospital.security.GeolocationService;
import com.example.hospital.security.JwtUtils;
import com.example.hospital.service.AuthService;
import com.example.hospital.service.UserDetailServiceImpl;
import com.example.hospital.service.UserSessionService;
import jakarta.annotation.Nullable;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.OffsetDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/")
public class LoginController {

    @Autowired
    private  AuthenticationManager manager;
    @Autowired
    private UserDetailServiceImpl userDetailService;
    @Autowired
    private AuthService authService;
    @Autowired
    private JwtUtils jwtUtils;


    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        try{
            authService.authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
        }
        catch (Exception e ){
            e.printStackTrace();
            throw new Exception("Failed login attempt");
        }

        UserDetails userDetails = userDetailService.loadUserByUsername(jwtRequest.getUsername());
        String token = jwtUtils.generateToken(userDetails);
        return ResponseEntity.ok(new JwtDTO(token));

    }


    @GetMapping("/current-user")
    public User getCurrentUser(Principal principal){
        return (User)this.userDetailService.loadUserByUsername(principal.getName());
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request) {
        authService.logout(request.getHeader("Authorization"));
    }
}
