package damcio.gymcms.security;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;

    private Long expiresIn;

}