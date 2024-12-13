package com.example.hospital.logging;

import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class RequestLogService {

    private static final String LOG_FILE_PATH = "request_logs.txt"; // Шлях до файлу логів
    private static final DateTimeFormatter dtFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public void logRequest(String clientIp, String userId, String protocol, String location, String event, int dataSize, long responseTime) {
        String logEntry = String.format("%s | %s | %s | %s | %s | %s | %d | %d\n",
                LocalDateTime.now(), clientIp, userId, protocol, location, event, dataSize, responseTime);

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(LOG_FILE_PATH, true))) {
            writer.write(logEntry);
        } catch (IOException e) {
            e.printStackTrace(); // Обробка виключень (можна покращити)
        }
    }

    public String logEvent(EventType eventType, String clientIp, String eventDescription) {
        return String.format("%s | EventType: %s | Client IP: %s | Description: %s\n",
                LocalDateTime.now().format(dtFormatter), eventType, clientIp, eventDescription);
    }
}