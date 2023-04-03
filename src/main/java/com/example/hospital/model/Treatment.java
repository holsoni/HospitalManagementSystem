package com.example.hospital.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "treatments")
public class Treatment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
    private String complaints;
    @ManyToOne
    @JoinColumn(name = "diagnosis_id")
    private Diagnosis diagnosis;
    @OneToMany
    private ArrayList<Procedures> procedures;
    @OneToMany
    private ArrayList<Prescription> prescriptions;
    @ManyToOne
    private Status status;
    private Time startTime;
    private Time endTime;
    private String comments;
    private Date created_at;
    private Date updated_at;
}
