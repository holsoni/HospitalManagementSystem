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
@Table(name = "histories")
public class MedicalHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @OneToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
    @OneToMany
    private ArrayList<Treatment> treatments;
    @OneToMany
    private ArrayList<Appointment> appointments;
    private Date created_at;
    private Date updated_at;
}
