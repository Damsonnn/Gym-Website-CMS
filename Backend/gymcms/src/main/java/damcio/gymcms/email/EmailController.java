package damcio.gymcms.email;

import java.io.UnsupportedEncodingException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("api/email")
@PreAuthorize("permitAll()")
@RequiredArgsConstructor
public class EmailController {
    private final EmailService emailService;

    @PostMapping("contact")
    public ResponseEntity<String> sendFromContactForm(@RequestBody ContactFormDto message) throws UnsupportedEncodingException, MessagingException{
        emailService.sendFromContactForm(message);
        return new ResponseEntity<String>("Wysłano wiadomość", HttpStatus.OK);
    }
}
