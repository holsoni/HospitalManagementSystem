package com.example.hospital.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "medical_card")
public class MedicalCard {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String condition;
    private String symptoms;
    @ManyToOne
    private Patient patient;
    private String admission;
    private LocalDateTime dateTime;
    @ManyToOne
    private Doctor doctor;
    private boolean hospitalized;
    private int bed;

    private Date createdAt;
    private Date updatedAt;

}
