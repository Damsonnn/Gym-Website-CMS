package damcio.gymcms.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class TokenExpiredException extends ResponseStatusException{
    public TokenExpiredException(String reason){
        super(HttpStatus.UNAUTHORIZED, reason);
    }
}
