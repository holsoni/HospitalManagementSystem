package com.example.hospital.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.ArrayList;
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
    private String name;
    private String fathersName;
    private String surname;
    @OneToMany
    private ArrayList<Schedule> schedule;
    @ManyToOne
    @JoinColumn(name = "specialization_id")
    private Specialization specialization;
    private String dateOfBirth;
    private String phone;
    @ManyToOne
    private Gender gender;
    @OneToMany
    private ArrayList<Feedback> feedbacks;
    private Date created_at;
    private Date updated_at;
}
