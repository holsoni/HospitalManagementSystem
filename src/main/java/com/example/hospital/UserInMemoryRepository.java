package com.example.hospital;

import com.example.hospital.model.CurrentUser;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.HashMap;

@Repository
public class UserInMemoryRepository {


    private final HashMap<String, CurrentUser> REGISTERED_USERS=new HashMap<>(2);

    @PostConstruct
    public void setupUsers(){
        REGISTERED_USERS.put("user1", buildUser("user1","$2a$10$PzYjduFgFzUTyK3bZfWSL.HLdKU6VKfLMGgROSepxH/m61eBK47Na"));
        REGISTERED_USERS.put("user2", buildUser("user2","$2a$10$PzYjduFgFzUTyK3bZfWSL.HLdKU6VKfLMGgROSepxH/m61eBK47Na"));
    }
    public CurrentUser findUserByEmail(final String email){
        return REGISTERED_USERS.get(email);
    }

    private static CurrentUser buildUser(final String username, final String password){
        final CurrentUser currentUser = new CurrentUser();
        currentUser.setUsername(username);
        currentUser.setPassword(password);

        return currentUser;
    }
}
