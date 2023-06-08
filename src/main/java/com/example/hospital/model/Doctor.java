package com.example.hospital.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String firstName;
    private String fathersName;
    private String lastName;
    @ManyToOne
    @JoinColumn(name = "specialization_id")
    private Specialization specialization;
    private String dateOfBirth;
    private String phone;
    private String gender;
    private Date created_at;
    private Date updated_at;
}
