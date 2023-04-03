package com.example.hospital.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "specializations")
public class Specialization {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String specializationName;
    @OneToMany
    @JoinColumn(name = "doctors_id", nullable = false)
    private LinkedHashSet<Doctor> doctors;
    private Date created_at;
    private Date updated_at;
}
