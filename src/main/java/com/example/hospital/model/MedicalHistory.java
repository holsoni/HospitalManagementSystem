package com.example.hospital.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
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

    private String symptoms;
    @ManyToOne
    @JoinColumn(name = "diagnosis_id")
    private Diagnosis diagnosis;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "treatment_id")
    private Treatment treatment;
    private String efficiency;
    private String efficiencyComments;
    private String treatmentResult;
    private String additionalDiagnosis;

  /*  @OneToMany
    private ArrayList<Appointment> appointments;*/
    private Date created_at;
    private Date updated_at;
}
