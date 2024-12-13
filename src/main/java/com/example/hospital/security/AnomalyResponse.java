package com.example.hospital.security;

import com.example.hospital.dto.Anomaly;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor

public class AnomalyResponse {
    List<Anomaly> anomalies;
}
