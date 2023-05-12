package com.example.hospital.controller.rest;

import com.example.hospital.dto.JwtDTO;
import com.example.hospital.dto.JwtRequest;
import com.example.hospital.dto.ResponseDTO;
import com.example.hospital.dto.UserDTO;
import com.example.hospital.model.User;
import com.example.hospital.security.JwtUtils;
import com.example.hospital.service.UserDetailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")
public class LoginController {

    @Autowired
    private  AuthenticationManager manager;
    @Autowired
    private UserDetailServiceImpl userDetailService;
    @Autowired
    private JwtUtils jwtUtils;


    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        try{
            authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
        }
        catch (UsernameNotFoundException e){
            e.printStackTrace();
            throw new Exception("User not found!");
        }

        UserDetails userDetails = userDetailService.loadUserByUsername(jwtRequest.getUsername());
        String token = jwtUtils.generateToken(userDetails);
        return ResponseEntity.ok(new JwtDTO(token));

    }

    private void authenticate(String username, String password) throws Exception {
        try {
            manager.authenticate(new UsernamePasswordAuthenticationToken(username,password));
        }
        catch (DisabledException e){
            throw new Exception("User [" + username + "] is disabled");
        }
        catch (BadCredentialsException e){
            throw new Exception("Invalid credentials "+ e.getMessage());
        }
    }
}
