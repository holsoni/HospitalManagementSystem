package com.example.hospital.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
    @ManyToOne
    @JoinColumn(name = "medical_card_id")
    private MedicalCard medicalCard;
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
    private String complaints;
    private String appointmentType;
    private String status;
    private String description;

    @Column(name = "start_time", columnDefinition = "TIMESTAMP")
    private LocalDateTime startTime;

    @Column(name = "end_time", columnDefinition = "TIMESTAMP")
    private LocalDateTime endTime;
    private Date created_at;
    private Date updated_at;
}
