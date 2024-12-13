package com.example.hospital.controller.rest;

import com.example.hospital.dto.Anomaly;
import com.example.hospital.model.BlockedIp;
import com.example.hospital.model.User;
import com.example.hospital.security.AnomalyDetectionService;
import com.example.hospital.security.JwtUtils;
import com.example.hospital.service.BlockService;
import com.example.hospital.service.UserDetailServiceImpl;
import jakarta.annotation.Nullable;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;

@RestController
public class AnomalyDetectionController {

    @Autowired
    private final AnomalyDetectionService anomalyDetectionService;
    @Autowired
    private final UserDetailServiceImpl userDetailService;
    @Autowired
    private final BlockService blockService;

    @Autowired
    public AnomalyDetectionController(AnomalyDetectionService anomalyDetectionService, UserDetailServiceImpl userDetailService, BlockService blockService) {
        this.anomalyDetectionService = anomalyDetectionService;
        this.userDetailService = userDetailService;
        this.blockService = blockService;
    }

    @GetMapping("/start-monitoring")
    public ResponseEntity<?> startMonitoring() {
        try {
            // Generate file path based on the current date
            String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            String filePath = "logs-" + currentDate + ".txt";
            File logFile = new File(filePath);

            // Check if the file exists
            if (!logFile.exists()) {
                System.out.println("Log file for today does not exist: " + filePath);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Log file for today does not exist.");
            }

            // Wrap the log file as a FileSystemResource
            FileSystemResource fileResource = new FileSystemResource(logFile);

            // Call the anomaly detection service and retrieve a list of anomalies
            List<Anomaly> anomalies = anomalyDetectionService.detectAnomalies(fileResource);

            // Return the anomalies as a JSON response
            return ResponseEntity.ok(anomalies);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during file processing.");
        }
    }

    @PostMapping("/block-suspicious-user")
    public ResponseEntity<?> blockSuspiciousUsers(HttpServletRequest request, @RequestParam String ip, @RequestParam(required = false) String id) {
        String username = new JwtUtils().extractUsername(request.getHeader("Authorization").substring(7));
        User manager = userDetailService.getByUsername(username);

        if (ip != null) {

            BlockedIp blockedIp = blockService.blockIp(ip, manager.getId());
            Long userId = Long.getLong(id);
            if (userId != null) {
                blockService.blockUser(userId, manager.getId());
            }
            return ResponseEntity.ok(Collections.singletonMap("message", "IP " + ip + " and user " + id + " have been blocked successfully."));
        }
        else {
            return ResponseEntity.badRequest().body("Invalid input. Please provide both IP and manager ID.");
        }
    }
}
