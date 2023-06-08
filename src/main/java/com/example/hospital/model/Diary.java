package com.example.hospital.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "diaries")
public class Diary {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private Date date;
    private String state;
    private String stateDescription;
    private String treatment;
    private int pressureTop;
    private int pressureBottom;
    private int pulse;
    private int saturation;
    private int temperature;
}
