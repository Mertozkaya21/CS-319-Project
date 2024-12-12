package com.example.demo.services;

import java.io.File;

import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.demo.Email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final String sender;

    public EmailService(JavaMailSender javaMailSender,  @Value("${spring.mail.username}") String sender){
        this.javaMailSender = javaMailSender;
        this.sender = sender;
    }
    
    public boolean sendSimpleMail(Email details)
    {
        try {
            SimpleMailMessage mailMessage
                = new SimpleMailMessage();

            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getBody());
            mailMessage.setSubject(details.getSubject());

            javaMailSender.send(mailMessage);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }

    public boolean sendMailWithAttachment(Email details)
    {
        MimeMessage mimeMessage
            = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {

            mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getBody());
            mimeMessageHelper.setSubject(
                details.getSubject());

            FileSystemResource file
                = new FileSystemResource(
                    new File(details.getAttachment()));

            mimeMessageHelper.addAttachment(
                file.getFilename(), file);

            javaMailSender.send(mimeMessage);
            return true;
        }
        catch (MessagingException e) {
            return false;
        }
    }
}
