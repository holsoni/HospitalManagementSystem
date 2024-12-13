package com.example.hospital.logging;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class LogFileUtil {

    private static final String LOG_DIRECTORY = "logs"; // Directory to store log files

    public static String getLogFilePath() {
        // Create a directory if it doesn't exist
        Path logDir = Paths.get(LOG_DIRECTORY);
        if (!Files.exists(logDir)) {
            try {
                Files.createDirectory(logDir);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        // Generate log file name with current date
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String date = LocalDate.now().format(formatter);
        return LOG_DIRECTORY + "/request_logs_" + date + ".txt"; // e.g., logs/request_logs_2024-10-08.txt
    }
}
