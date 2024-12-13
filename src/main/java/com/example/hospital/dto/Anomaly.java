package com.example.hospital.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
public class Anomaly {
    @JsonAlias(value = "anomaly_count")
    private int anomalyCount;
    @JsonAlias(value = "avg_reconstruction_error")
    private double avgReconstructionError;
    @JsonAlias(value = "original_ipAddress")
    private String originalIpAddress;
    @JsonAlias(value = "original_user")
    private String originalUser;
}
