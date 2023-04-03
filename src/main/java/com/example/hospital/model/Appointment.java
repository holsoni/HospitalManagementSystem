package com.example.hospital.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
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
    private String complaints;
    @ManyToOne
    @JoinColumn(name = "appointment_type_id")
    private AppointmentType appointmentType;
    @ManyToOne
    private Status status;
    private String description;
    private Time startTime;
    private Time endTime;
    private Date created_at;
    private Date updated_at;

}
