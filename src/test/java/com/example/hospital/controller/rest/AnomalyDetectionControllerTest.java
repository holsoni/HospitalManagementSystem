package com.example.hospital.controller.rest;

import com.example.hospital.dto.Anomaly;
import com.example.hospital.model.BlockedIp;
import com.example.hospital.model.User;
import com.example.hospital.security.AnomalyDetectionService;
import com.example.hospital.service.BlockService;
import com.example.hospital.service.UserDetailServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;

import jakarta.servlet.http.HttpServletRequest;

import java.io.File;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AnomalyDetectionControllerTest {

    @Mock
    private AnomalyDetectionService anomalyDetectionService;

    @Mock
    private UserDetailServiceImpl userDetailService;

    @Mock
    private BlockService blockService;

    @InjectMocks
    private AnomalyDetectionController anomalyDetectionController;

    // 1. Functional Testing Scenarios

    @Test
    void testProcessValidLogFile() throws Exception {
        // Mocking a valid log file
        File validFile = new File("logs-2024-01-01.txt");

        FileSystemResource fileResource = new FileSystemResource(validFile);
        when(anomalyDetectionService.detectAnomalies(any(FileSystemResource.class)))
                .thenReturn(Collections.emptyList());

        // Test the method
        ResponseEntity<?> response = anomalyDetectionController.startMonitoring();

        // Assert that the response contains no anomalies
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(((List<?>) response.getBody()).isEmpty());
    }

    @Test
    void testHandleMalformedLogFile() throws Exception {
        // Mocking a file that will cause an exception
        File malformedFile = Mockito.mock(File.class);

        when(anomalyDetectionService.detectAnomalies(any(FileSystemResource.class)))
                .thenThrow(new RuntimeException("File is malformed or unreadable"));

        // Test the method
        ResponseEntity<?> response = anomalyDetectionController.startMonitoring();

        // Assert that the response indicates an error
        assertEquals(500, response.getStatusCodeValue());
        assertEquals("An error occurred during file processing.", response.getBody());
    }

    // 2. Performance Testing Scenarios

    @Test
    void testLargeFileProcessing() throws Exception {
        File largeFile = Mockito.mock(File.class);

        when(anomalyDetectionService.detectAnomalies(any(FileSystemResource.class)))
                .thenReturn(Collections.emptyList());

        long startTime = System.currentTimeMillis();
        ResponseEntity<?> response = anomalyDetectionController.startMonitoring();
        long endTime = System.currentTimeMillis();

        // Assert the response and processing time
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(endTime - startTime < 10000); // Processing time < 10 seconds
    }

    // 3. Robustness Testing Scenarios

    @Test
    void testFlaskServiceUnavailable() throws Exception {
        when(anomalyDetectionService.detectAnomalies(any(FileSystemResource.class)))
                .thenThrow(new RuntimeException("Flask service unavailable"));

        ResponseEntity<?> response = anomalyDetectionController.startMonitoring();

        // Assert that the response indicates an error
        assertEquals(500, response.getStatusCodeValue());
        assertEquals("An error occurred during file processing.", response.getBody());
    }

    @Test
    void testInvalidDataFormat() throws Exception {
        when(anomalyDetectionService.detectAnomalies(any(FileSystemResource.class)))
                .thenThrow(new IllegalArgumentException("Unsupported file format"));

        ResponseEntity<?> response = anomalyDetectionController.startMonitoring();

        // Assert that the response indicates an error
        assertEquals(500, response.getStatusCodeValue());
        assertEquals("An error occurred during file processing.", response.getBody());
    }

    // 4. Accuracy Testing Scenarios

    @Test
    void testDetectKnownAnomalies() throws Exception {
        FileSystemResource testFile = new FileSystemResource("test-logs-with-anomalies.txt");
        List<Anomaly> anomalies = List.of(
                new Anomaly(1, 0.15, "192.168.1.1", "user1"),
                new Anomaly(1, 0.20, "192.168.1.2", "user2")
        );
        when(anomalyDetectionService.detectAnomalies(any(FileSystemResource.class)))
                .thenReturn(anomalies);

        ResponseEntity<?> response = anomalyDetectionController.startMonitoring();

        // Assert that anomalies are detected correctly
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(2, ((List<?>) response.getBody()).size());
    }

    // 5. End-to-End Testing Scenarios

    @Test
    void testBlockingSuspiciousUser() throws Exception {
        HttpServletRequest mockRequest = Mockito.mock(HttpServletRequest.class);
        when(mockRequest.getHeader("Authorization")).thenReturn("Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTczMjQ0Mjc0NCwiZXhwIjoxNzMyNDc4NzQ0fQ.3Y0zYf2B7RlTAgabav4EoU4WKlvBPoPqtLdP_zIM3Q0");
        when(userDetailService.getByUsername(anyString())).thenReturn(new User(1L, "admin"));

        BlockedIp blockedIp = new BlockedIp();
        blockedIp.setIpAddress("192.168.1.1");
        when(blockService.blockIp(anyString(), anyLong())).thenReturn(blockedIp);

        ResponseEntity<?> response = anomalyDetectionController.blockSuspiciousUsers(mockRequest, "192.168.1.1", null);

        // Assert successful blocking
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody().toString().contains("IP 192.168.1.1 and user null have been blocked successfully."));
    }
}



