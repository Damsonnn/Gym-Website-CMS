package damcio.gymcms.security;

import lombok.Data;

@Data
public class LoginResponse {
    private Integer userId;

    private String token;

    private Long expiresIn;

    private String roleName;
}