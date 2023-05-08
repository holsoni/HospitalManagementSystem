package com.example.hospital.service;

import com.example.hospital.UserInMemoryRepository;
import com.example.hospital.model.CurrentUser;
import com.example.hospital.model.User;
import com.example.hospital.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class CurrentUserService implements UserDetailsService {
    private final UserInMemoryRepository memoryRepository;
    private final UserRepository repository;

    @Autowired
    public CurrentUserService(UserInMemoryRepository memoryRepository,UserRepository repository) {
        this.memoryRepository = memoryRepository;
        this.repository = repository;
    }



    @Override
    public CurrentUser loadUserByUsername(String username) throws UsernameNotFoundException {
        //final CurrentUser currentUser = memoryRepository.findUserByEmail(username);
        User currentUser = repository.findByUsername(username);
        System.out.println(currentUser.getUsername());
        if (currentUser == null){
             throw new UsernameNotFoundException("Failed to find user with email " + username);
        }
        return new CurrentUser(currentUser.getUsername(), currentUser.getPassword());
    }
}
