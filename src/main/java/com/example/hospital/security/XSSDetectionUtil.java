package com.example.hospital.security;

import java.util.regex.Pattern;

public class XSSDetectionUtil {

    // Common XSS patterns
    private static final Pattern[] XSS_PATTERNS = {
        Pattern.compile("<script>(.*?)</script>", Pattern.CASE_INSENSITIVE),
        Pattern.compile("src[\r\n]*=[\r\n]*\\'(.*?)\\'", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL),
        Pattern.compile("src[\r\n]*=[\r\n]*\\\"(.*?)\\\"", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL),
        Pattern.compile("</script>", Pattern.CASE_INSENSITIVE),
        Pattern.compile("<script(.*?)>", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL),
        Pattern.compile("eval\\((.*?)\\)", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL),
        Pattern.compile("expression\\((.*?)\\)", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL),
        Pattern.compile("on[a-zA-Z]*=[\\'\\\"](.*?)[\\'\\\"]", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL),
        Pattern.compile("javascript:", Pattern.CASE_INSENSITIVE),
        Pattern.compile("vbscript:", Pattern.CASE_INSENSITIVE),
        Pattern.compile("alert\\((.*?)\\)", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL),
        Pattern.compile("document.cookie", Pattern.CASE_INSENSITIVE),
        Pattern.compile("<iframe>(.*?)</iframe>", Pattern.CASE_INSENSITIVE),
        Pattern.compile("onerror", Pattern.CASE_INSENSITIVE)
    };

    public static boolean containsXSS(String input) {
        if (input == null) {
            return false;
        }
        for (Pattern scriptPattern : XSS_PATTERNS) {
            if (scriptPattern.matcher(input).find()) {
                return true; // XSS detected
            }
        }
        return false;
    }
}