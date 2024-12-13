package com.example.hospital.logging;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class LogEvent {
    private static final DateTimeFormatter dtFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private LocalDateTime timestamp;
    private String ipAddress;
    private Long userId;
    private String endpoint;
    private String protocol;
    private String location;
    private String event;
    private int requestDataSize;
    private int responseDataSize;
    private String statusCode;  // HTTP response code
    private long responseTime;  // Time taken to process request
    private String additionalDetails;

    // New fields
    private String userAgent;   // Client's browser or application details
    private String requestMethod; // HTTP method used (GET, POST, etc.)
    private String errorMessage; // Specific error message (if applicable)

    // Constructor
    public LogEvent(String ipAddress, Long userId, String endpoint, String protocol, String location, String event, int requestDataSize,
                    int responseDataSize, String statusCode, long responseTime, String additionalDetails,
                    String userAgent, String requestMethod, String errorMessage) {
        this.timestamp = LocalDateTime.now();
        this.ipAddress = ipAddress;
        this.userId = userId;
        this.endpoint = endpoint;
        this.protocol = protocol;
        this.location = location;
        this.event = event;
        this.requestDataSize = requestDataSize;
        this.responseDataSize = responseDataSize;
        this.statusCode = statusCode;
        this.responseTime = responseTime;
        this.additionalDetails = additionalDetails;
        this.userAgent = userAgent;  // New field
        this.requestMethod = requestMethod;  // New field
        this.errorMessage = errorMessage;  // New field
    }

    // Format the log entry for file writing
    @Override
    public String toString() {
        return String.format("%s - IP: %s, User: %s, Endpoint: %s, Protocol: %s, Location: %s, Event: %s, Request Data Size: %d bytes, Response Data Size: %d bytes, Status: %s, Response Time: %dms, User Agent: %s, Request Method: %s, Error Message: %s",
                timestamp.format(dtFormatter), ipAddress, userId, endpoint, protocol, location, event, requestDataSize, responseDataSize, statusCode, responseTime, userAgent, requestMethod, errorMessage);
    }
}