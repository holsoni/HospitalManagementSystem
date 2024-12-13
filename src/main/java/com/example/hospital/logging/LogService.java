package com.example.hospital.logging;

import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class LogService {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private String currentLogFilePath;  // Store the current log file path
    private LocalDate currentDate;      // Track the current date

    public LogService() {
        this.currentDate = LocalDate.now();
        this.currentLogFilePath = generateLogFilePath();
        createLogFileIfNotExists();
    }

    // Generate the log file path based on the current date
    private String generateLogFilePath() {
        String dateStr = currentDate.format(DATE_FORMAT);
        return "logs-" + dateStr + ".txt";  // e.g., logs-2024-10-15.txt
    }

    // Method to check if a new log file needs to be created (based on the date)
    private void checkForNewLogFile() {
        LocalDate now = LocalDate.now();
        if (!now.equals(currentDate)) {
            currentDate = now;
            currentLogFilePath = generateLogFilePath();
            createLogFileIfNotExists();
        }
    }

    // Method to ensure the log file exists (creates a new one if not)
    private void createLogFileIfNotExists() {
        try {
            if (!Files.exists(Paths.get(currentLogFilePath))) {
                Files.createFile(Paths.get(currentLogFilePath));
            }
        } catch (IOException e) {
            System.err.println("Error creating log file: " + e.getMessage());
        }
    }

    // Log the event by writing it to the appropriate file
    public void logEvent(LogEvent logEvent) {
        checkForNewLogFile();  // Ensure the log file is updated based on the current date
        writeToFile(logEvent.toString());
    }

    // Write the log entry to the current file
    private void writeToFile(String logEntry) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(currentLogFilePath, true))) {
            writer.write(logEntry);
            writer.newLine();  // New line after each log entry
        } catch (IOException e) {
            System.err.println("Error writing log entry: " + e.getMessage());
        }
    }
}