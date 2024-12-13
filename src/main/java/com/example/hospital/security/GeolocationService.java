package com.example.hospital.security;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;

@Service
public class GeolocationService {

    private static final String API_URL = "http://ip-api.com/json/";

    public static String getLocation(String clientIp) {
       /* RestTemplate restTemplate = new RestTemplate();
        try {
            LocationResponse response = restTemplate.getForObject(API_URL + clientIp, LocationResponse.class);
            if (response != null && "success".equals(response.getStatus())) {
                return response.getCity() + ", " + response.getRegionName() + ", " + response.getCountry();
            }
        } catch (HttpClientErrorException e) {
            // Log the exception (or handle it appropriately)
            e.printStackTrace();
        }*/
        return "unknown"; // Fallback if location can't be determined
    }

    // Class to map the response from the geolocation API
    public static class LocationResponse {
        private String status;
        private String city;
        private String regionName;
        private String country;

        // Getters and Setters
        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getCity() {
            return city;
        }

        public void setCity(String city) {
            this.city = city;
        }

        public String getRegionName() {
            return regionName;
        }

        public void setRegionName(String regionName) {
            this.regionName = regionName;
        }

        public String getCountry() {
            return country;
        }

        public void setCountry(String country) {
            this.country = country;
        }
    }
}
