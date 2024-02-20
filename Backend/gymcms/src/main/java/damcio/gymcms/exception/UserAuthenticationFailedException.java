package damcio.gymcms.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UserAuthenticationFailedException extends ResponseStatusException{
    public UserAuthenticationFailedException(String reason){
        super(HttpStatus.UNAUTHORIZED, reason);
    }
}
