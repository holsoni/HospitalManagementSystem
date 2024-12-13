package com.example.hospital.service;

import com.example.hospital.model.BlockedIp;
import com.example.hospital.repository.BlockedIpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class BlockService {

    @Autowired
    private BlockedIpRepository blockedIpRepository;

    @Autowired
    private UserDetailServiceImpl userDetailService;

    public BlockedIp blockIp(String ip, Long managerId) {
        BlockedIp blockedIp = new BlockedIp();
        blockedIp.setIpAddress(ip);
        blockedIp.setBlockedByManager(managerId);
        blockedIp.setBlockDate(LocalDateTime.now());
        
        return blockedIpRepository.save(blockedIp);
    }

    public void blockUser(Long userId, Long managerId) {
        userDetailService.blockUser(userId, managerId);
    }
}
