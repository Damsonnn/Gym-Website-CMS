package damcio.gymcms.user;

import lombok.Data;
import lombok.Value;

@Data
public class RegisterUserDTO {
    private String username;

    private String password;

    private String email;

    private String roleName;
}
