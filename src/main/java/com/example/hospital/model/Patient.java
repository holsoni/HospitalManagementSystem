package com.example.hospital.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.File;
import java.sql.Date;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User userId;
    private String firstName;
    private String fathersName;
    private String lastName;
    private String dateOfBirth;
    @ManyToOne
    private Address placeOfBirth;
    @ManyToOne
    private Address currentAddress;
    private String imgSrc;
    private String phone;
    private String email;
    private String birthCode;
    private String gender;
    private Date created_at;
    private Date updated_at;
}
