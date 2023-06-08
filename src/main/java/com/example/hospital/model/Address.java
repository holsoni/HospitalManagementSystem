package com.example.hospital.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Locale;
import java.util.UUID;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "adress")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String country;
    private String region;
    private String city;
    private String street;
    private String number;
}
