package com.example.hospital.repository;

import com.example.hospital.model.BlockedIp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlockedIpRepository extends JpaRepository<BlockedIp, Long> {
    public BlockedIp getBlockedIpByIpAddress(String ip);
    boolean existsByIpAddress(String ip);
}
