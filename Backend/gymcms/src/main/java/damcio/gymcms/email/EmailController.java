package damcio.gymcms.email;

import java.io.UnsupportedEncodingException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RestController;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("api/email")
@PreAuthorize("permitAll()")
@RequiredArgsConstructor
public class EmailController {
    private final EmailService emailService;

    @PostMapping("/contact")
    private ResponseEntity<String> sendFromContactForm(@RequestBody ContactFormDto message) throws UnsupportedEncodingException, MessagingException{
        emailService.sendFromContactForm(message);
        return new ResponseEntity<String>("Wysłano wiadomość", HttpStatus.OK);
    }
}
