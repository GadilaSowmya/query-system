package com.example.QuerySystem.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "mentors")
@Getter
@Setter
public class Mentor {

    @Id
    @Column(name = "mentor_id")
    private String mentorId;

    // ===== BASIC DETAILS =====
    private String name;
    private String age;
    private String gender;

    // ===== CONTACT DETAILS =====
    @Column(unique = true)
    private String email;

    private String phone;
    private String location;

    // ===== PROFESSIONAL DETAILS =====
    private String organization;
    private String designation;
    private String experience;

    // ===== AUTH DETAILS =====
    private String otp;
    private LocalDateTime otpExpiry;

    private boolean active;
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.active = false;
    }
}
