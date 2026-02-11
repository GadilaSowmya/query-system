package com.example.QuerySystem.controller;

import com.example.QuerySystem.service.MentorAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/mentor/auth")
@CrossOrigin
public class MentorAuthController {

    @Autowired
    private MentorAuthService mentorAuthService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> data) {
        mentorAuthService.signup(data);
        return ResponseEntity.ok(Map.of("message", "OTP sent to mentor email"));
    }

    @PostMapping("/verify-signup-otp")
    public ResponseEntity<?> verifySignup(@RequestBody Map<String, String> data) {
        mentorAuthService.verifySignupOtp(data.get("email"), data.get("otp"));
        return ResponseEntity.ok(Map.of("message", "Mentor verified"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> data) {
        mentorAuthService.login(data.get("email"));
        return ResponseEntity.ok(Map.of("message", "OTP sent for login"));
    }

    @PostMapping("/verify-login-otp")
    public ResponseEntity<?> verifyLogin(@RequestBody Map<String, String> data) {
        String mentorId = mentorAuthService.verifyLoginOtp(
                data.get("email"),
                data.get("otp")
        );
        return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "mentorId", mentorId
        ));

    }
}
