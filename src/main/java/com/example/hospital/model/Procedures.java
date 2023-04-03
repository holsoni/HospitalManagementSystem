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
@Table(name = "procedures")
public class Procedures {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String procedureName;
    private Date created_at;
    private Date updated_at;
}
