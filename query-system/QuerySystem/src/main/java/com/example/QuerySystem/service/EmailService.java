package com.example.QuerySystem.service;

import com.example.QuerySystem.entity.Query;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class EmailService {

    @Value("${spring.sendgrid.api-key}")
    private String sendGridApiKey;

    @Value("${app.email.from}")
    private String fromEmail;

    // 🔹 Central admin email
    private static final String ADMIN_EMAIL = "central.querysystem@gmail.com";

    // 1️⃣ Send OTP to user
    public void sendOtp(String toEmail, String otp) {
        String subject = "OTP Verification";
        String content = "Your OTP is: " + otp + "\n\nThis OTP is valid for 5 minutes.";
        sendEmail(toEmail, subject, content);
    }

    // 2️⃣ Notify admin when user submits a query
    public void sendAdminNotification(Query query) {
        String subject = "New Query Submitted";
        String content = "A new query has been submitted.\n\n" +
                "Query ID: " + query.getQueryId() + "\n" +
                "User ID: " + query.getUserId() + "\n" +
                "Category: " + query.getCategory() + "\n" +
                "Priority: " + query.getPriority() + "\n\n" +
                "Query:\n" + query.getOriginalQuery();

        sendEmail(ADMIN_EMAIL, subject, content);
    }

    // 3️⃣ Send reply email to user
    public void sendReplyToUser(String toEmail, String queryId, String reply) {
        String subject = "Reply to Your Query (ID: " + queryId + ")";
        String content = "Your query has been answered.\n\n" +
                "Query ID: " + queryId + "\n\n" +
                "Admin Reply:\n" + reply;

        sendEmail(toEmail, subject, content);
    }

    // 🔹 Helper method to send email via SendGrid
    private void sendEmail(String toEmail, String subject, String body) {
        Email from = new Email(fromEmail);
        String subjectLine = subject;
        Email to = new Email(toEmail);
        Content content = new Content("text/plain", body);
        Mail mail = new Mail(from, subjectLine, to, content);

        SendGrid sg = new SendGrid(sendGridApiKey);
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            System.out.println("Email sent status: " + response.getStatusCode());
        } catch (IOException ex) {
            System.err.println("Error sending email: " + ex.getMessage());
        }
    }
}
