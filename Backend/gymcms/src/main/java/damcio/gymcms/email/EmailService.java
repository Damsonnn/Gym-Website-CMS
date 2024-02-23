package damcio.gymcms.email;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import damcio.gymcms.exception.MailFailedException;
import damcio.gymcms.security.PasswordResetToken;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender emailSender;

    @Value("${spring.mail.username}")
    private String serviceEmail;

    @Value("${spring.mail.properties.sender.name}")
    private String serviceEmailName;

    public void sendFromContactForm(ContactFormDto message) {
        String subject = "[Formularz] " + message.getSubject();
        String content = "[" + message.getSenderEmail() + "]\n" + message.getMessage();
        sendEmail(message.getSendTo(), subject, content, message.getSenderEmail(), message.getSenderName());
    }

    public void sendPasswordResetToken(PasswordResetToken passwordResetToken){
        String url = "http://localhost:3000" + "/reset-password?token=" + passwordResetToken.getToken();
        String content = "Link to your password reset:\n" + url;
        String sendTo = passwordResetToken.getUser().getEmail();
        String subject = "Password reset";
        sendEmail(sendTo, subject, content, serviceEmail, serviceEmailName);
    }

    private void sendEmail(String email, String subject, String content, String senderEmail, String senderName) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom(senderEmail, senderName);
            helper.setTo(email);
            helper.setSubject(subject);
            helper.setText(content);
            
            emailSender.send(message);
        } catch (Exception ex){
            throw new MailFailedException("Couldn't send mail\n" + ex.getMessage() );
        }
    }
}
