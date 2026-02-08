package com.example.QuerySystem.service;

import com.example.QuerySystem.entity.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @org.springframework.beans.factory.annotation.Value("${spring.mail.username}")
    private String fromEmail;

    // 🔹 Central admin email (temporary)
    private static final String ADMIN_EMAIL = "central.querysystem@gmail.com";

    // 1️⃣ Send OTP to user
    public void sendOtp(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("OTP Verification");
        message.setText(
                "Your OTP is: " + otp +
                        "\n\nThis OTP is valid for 5 minutes.");

        mailSender.send(message);
    }

    // 2️⃣ Notify admin when user submits a query
    public void sendAdminNotification(Query query) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(ADMIN_EMAIL);
        message.setSubject("New Query Submitted");

        message.setText(
                "A new query has been submitted.\n\n" +
                        "Query ID: " + query.getQueryId() + "\n" +
                        "User ID: " + query.getUserId() + "\n" +
                        "Category: " + query.getCategory() + "\n" +
                        "Priority: " + query.getPriority() + "\n\n" +
                        "Query:\n" + query.getOriginalQuery());

        mailSender.send(message);
    }

    // 3️⃣ Send reply email to user
    public void sendReplyToUser(String toEmail, String queryId, String reply) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Reply to Your Query (ID: " + queryId + ")");

        message.setText(
                "Your query has been answered.\n\n" +
                        "Query ID: " + queryId + "\n\n" +
                        "Admin Reply:\n" + reply);

        mailSender.send(message);
    }
}
