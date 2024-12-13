package com.example.hospital.security;

import com.example.hospital.dto.Anomaly;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import java.util.List;

@Service
public class AnomalyDetectionService {

    private final String FLASK_API_URL = "http://127.0.0.1:5050/detect_anomalies";
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<Anomaly> detectAnomalies(FileSystemResource fileResource) throws Exception {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", fileResource);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(FLASK_API_URL, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            AnomalyResponse responseBody = objectMapper.readValue(response.getBody(), AnomalyResponse.class);

            return responseBody.getAnomalies();
        } else {
            throw new Exception("Failed to detect anomalies: " + response.getStatusCode());
        }
    }
}
