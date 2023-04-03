package com.example.hospital.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "typesOfAppointments")
public class AppointmentType {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String typeName;
    private Date created_at;
    private Date updated_at;
}
