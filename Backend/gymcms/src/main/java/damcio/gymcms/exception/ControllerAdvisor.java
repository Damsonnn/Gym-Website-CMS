package damcio.gymcms.exception;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerAdvisor{

    @ExceptionHandler(value = ResourceNotFoundException.class)
    public ResponseEntity<Object> handleResourceNotFoundException(Exception ex){
        Map<String, Object> body = new HashMap<>();
        body.put("message", ex.getMessage());
        
        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = AllAdminsRemovalException.class)
    public ResponseEntity<Object> handleAllAdminsRemovalException(Exception ex){
        Map<String, Object> body = new HashMap<>();
        body.put("message", ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = MailFailedException.class)
    public ResponseEntity<Object> handleMailFailedException(Exception ex){
        Map<String, Object> body = new HashMap<>();
        body.put("message", ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.FAILED_DEPENDENCY);
    }

    @ExceptionHandler(value = UserAuthenticationFailedException.class)
    public ResponseEntity<Object> handleUserAuthenticationFailedException(Exception ex){
        Map<String, Object> body = new HashMap<>();
        body.put("message", ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.UNAUTHORIZED);
    }
}