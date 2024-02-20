package damcio.gymcms.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class AllAdminsRemovalException extends ResponseStatusException {

    public AllAdminsRemovalException(String reason){
        super(HttpStatus.CONFLICT, reason);
    }
}