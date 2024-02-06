package damcio.gymcms.email;
import lombok.Data;

@Data
public class ContactFormDto {
    private String senderName;

    private String senderEmail;

    private String sendTo;

    private String message;

    private String subject;
}