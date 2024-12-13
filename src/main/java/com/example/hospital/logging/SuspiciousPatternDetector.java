package com.example.hospital.logging;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public class SuspiciousPatternDetector {

    private List<Pattern> suspiciousPatterns;

    public SuspiciousPatternDetector() {
        suspiciousPatterns = new ArrayList<>();
        loadSuspiciousPatterns();
    }

    private void loadSuspiciousPatterns() {
        suspiciousPatterns.add(Pattern.compile("(?i)select\\s+.*from.*")); 
        suspiciousPatterns.add(Pattern.compile("(?i)union\\s+select.*"));   
        suspiciousPatterns.add(Pattern.compile("(?i)drop\\s+table.*"));    
        suspiciousPatterns.add(Pattern.compile("(?i)or\\s+1=1"));          
        suspiciousPatterns.add(Pattern.compile("(?i)';.*--"));             

        suspiciousPatterns.add(Pattern.compile("<script>.*</script>"));   
        suspiciousPatterns.add(Pattern.compile("onerror\\s*=\\s*['\"]"));  
    }

    public boolean isSuspicious(String input) {
        if (input == null) return false;
        for (Pattern pattern : suspiciousPatterns) {
            if (pattern.matcher(input).find()) {
                return true;  
            }
        }
        return false;  
    }
}

