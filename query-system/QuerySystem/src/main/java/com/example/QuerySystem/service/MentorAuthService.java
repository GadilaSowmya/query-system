package com.example.QuerySystem.service;

import com.example.QuerySystem.entity.Mentor;
import com.example.QuerySystem.repository.MentorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@Service
public class MentorAuthService {

    @Autowired
    private MentorRepository mentorRepo;

    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailService emailService;

    // 1️⃣ Mentor Signup
    public void signup(Map<String, String> data) {

        if (mentorRepo.findByEmail(data.get("email")).isPresent()) {
            throw new RuntimeException("Mentor already exists");
        }

        Mentor mentor = new Mentor();

        String mentorId = "M" + LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

        mentor.setMentorId(mentorId);
        mentor.setName(data.get("name"));
        mentor.setAge(data.get("age"));
        mentor.setGender(data.get("gender"));
        mentor.setEmail(data.get("email"));
        mentor.setPhone(data.get("phone"));
        mentor.setLocation(data.get("location"));
        mentor.setOrganization(data.get("organization"));
        mentor.setDesignation(data.get("designation"));
        mentor.setExperience(data.get("experience"));


        String otp = otpService.generateOtp();
        mentor.setOtp(otp);
        mentor.setOtpExpiry(otpService.getExpiryTime());

        mentorRepo.save(mentor);
        emailService.sendOtp(mentor.getEmail(), otp);
    }

    // 2️⃣ Verify Signup OTP
    public void verifySignupOtp(String email, String otp) {

        Mentor mentor = mentorRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Mentor not found"));

        if (!otpService.isOtpValid(otp, mentor.getOtp(), mentor.getOtpExpiry())) {
            throw new RuntimeException("Invalid or expired OTP");
        }

        mentor.setActive(true);
        mentor.setOtp(null);
        mentor.setOtpExpiry(null);

        mentorRepo.save(mentor);
    }

    // 3️⃣ Login
    public void login(String email) {

        Mentor mentor = mentorRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Mentor not found"));

        if (!mentor.isActive()) {
            throw new RuntimeException("Mentor not verified");
        }

        String otp = otpService.generateOtp();
        mentor.setOtp(otp);
        mentor.setOtpExpiry(otpService.getExpiryTime());

        mentorRepo.save(mentor);
        emailService.sendOtp(email, otp);
    }

    // 4️⃣ Verify Login OTP
    public String verifyLoginOtp(String email, String otp) {

        Mentor mentor = mentorRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Mentor not found"));

        if (!otpService.isOtpValid(otp, mentor.getOtp(), mentor.getOtpExpiry())) {
            throw new RuntimeException("Invalid OTP");
        }

        mentor.setOtp(null);
        mentor.setOtpExpiry(null);
        mentorRepo.save(mentor);

        return mentor.getMentorId();
    }
}
