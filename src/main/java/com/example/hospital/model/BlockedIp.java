package com.example.hospital.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Entity
@RequiredArgsConstructor
public class BlockedIp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String ipAddress;
    private Long blockedByManager;
    private LocalDateTime blockDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public Long getBlockedByManager() {
        return blockedByManager;
    }

    public void setBlockedByManager(Long blockedByManager) {
        this.blockedByManager = blockedByManager;
    }

    public LocalDateTime getBlockDate() {
        return blockDate;
    }

    public void setBlockDate(LocalDateTime blockDate) {
        this.blockDate = blockDate;
    }
}
