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
@Table(name = "schedules")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private Date date;
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctorID;
    private Time startTime;
    private Time endTime;
    @OneToMany
    @JoinColumn(name = "appointments_id")
    private ArrayList<Appointment> appointments;
    private Date created_at;
    private Date updated_at;

}
