package com.example.hospital.service;

import com.example.hospital.model.User;
import com.example.hospital.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service

public class UserDetailServiceImpl implements UserDetailsService {
    @Autowired
    private final UserRepository repository;

    @Autowired
    public UserDetailServiceImpl(UserRepository repository) {
        this.repository = repository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User currentUser = repository.findByUsername(username);
        if (currentUser == null){
             throw new UsernameNotFoundException("Failed to find user with email " + username);
        }
        return currentUser;
    }
    public User getByUsername(String username) {
        User currentUser = repository.findByUsername(username);
        if (currentUser == null){
            throw new UsernameNotFoundException("Failed to find user with email " + username);
        }
        return currentUser;
    }

    public void updateFailedAttempts(String userName) {
        User byUsername = repository.findByUsername(userName);
        byUsername.setFailedLoginAttempts(byUsername.getFailedLoginAttempts() == null ? 1 : byUsername.getFailedLoginAttempts() + 1);
        repository.save(byUsername);
    }

    public void resetFailedAttempts(String userName) {
        User byUsername = repository.findByUsername(userName);
        byUsername.setFailedLoginAttempts(0L);
        repository.save(byUsername);
    }

    public void blockUser(Long id, Long blockedByManagerId) {
        if (repository.findById(id).isPresent()) {
            User byUsername = repository.findById(id).get();
            byUsername.setStatus("BLOCKED");
            byUsername.setBlockByManager(blockedByManagerId);
            repository.save(byUsername);
        } else {
            throw new UsernameNotFoundException("User not found!");
        }
    }
}


