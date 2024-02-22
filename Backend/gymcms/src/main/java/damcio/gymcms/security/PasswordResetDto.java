package damcio.gymcms.security;

import lombok.Data;

@Data
public class PasswordResetDto {
    private String token;

    private String password;
}