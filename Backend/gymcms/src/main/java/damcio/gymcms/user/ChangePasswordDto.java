package damcio.gymcms.user;

import lombok.Data;

@Data
public class ChangePasswordDto { 
    private String oldPassword;

    private String newPassword;
}
