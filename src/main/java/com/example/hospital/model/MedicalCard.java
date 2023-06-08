package com.example.hospital.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Set;
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
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "medical_history_id", referencedColumnName = "id")
    private MedicalHistory medicalHistory;
    @ManyToOne
    private Patient patient;
    private String admission;
    private LocalDateTime dateTime;
    private Date treatmentCancelledDate;
    private boolean treatmentCancelled;
    @ManyToOne
    private Doctor doctor;
    private boolean hospitalized;
    @OneToOne(optional = true)
    private Bed bed;

    @OneToMany
    private Set<Diary> diarySet;
    private boolean historyFilled;

    private Date createdAt;
    private Date updatedAt;

}
