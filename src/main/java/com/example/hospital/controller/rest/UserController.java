package com.example.hospital.controller.rest;

import com.example.hospital.model.User;
import com.example.hospital.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("")
public class UserController {
    // standard constructors

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    private final UserRepository userRepository;



    @GetMapping("/users")
    public List<User> getUsers() {
        return  userRepository.findAll();
    }

    @PostMapping("/users")
    void addUser(@RequestBody User user) {
        userRepository.save(user);
    }

    @PostMapping(value = "users/delete/{id}")
    public void deleteUser(@PathVariable UUID id) {
        this.userRepository.deleteById(id);
    }



}