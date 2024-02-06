package damcio.gymcms.email;

import java.io.UnsupportedEncodingException;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender emailSender;

    public void sendFromContactForm(ContactFormDto message) throws UnsupportedEncodingException, MessagingException{
        sendEmail(message.getSendTo(), "[Formularz] " + message.getSubject(), message.getMessage(), message.getSenderEmail(), message.getSenderName());
    }

    private void sendEmail(String email, String subject, String content, String clientEmail, String clientName)throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(clientEmail, clientName);
        helper.setTo(email);
        helper.setSubject(subject);
        helper.setText(content);
        
        emailSender.send(message);
        return;
    }
}
