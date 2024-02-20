package damcio.gymcms.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class MailFailedException extends ResponseStatusException{

    public MailFailedException(String reason){
        super(HttpStatus.FAILED_DEPENDENCY, reason);
    }
}
