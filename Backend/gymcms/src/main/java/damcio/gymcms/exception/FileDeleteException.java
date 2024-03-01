package damcio.gymcms.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class FileDeleteException extends ResponseStatusException {
    
    public FileDeleteException(String reason){
        super(HttpStatus.INTERNAL_SERVER_ERROR, reason);
    }
}
