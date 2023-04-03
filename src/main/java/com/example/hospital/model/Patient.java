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
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User userId;
    private String name;
    private String fathersName;
    private String surname;
    private String dateOfBirth;
    private String weight;
    private String height;
    private String phone;
    @ManyToOne
    private Gender gender;
    private Date created_at;
    private Date updated_at;
}
