package damcio.gymcms.user;

import lombok.Data;

@Data
public class ChangePasswordDto {
    private Integer userId;
    
    private String oldPassword;

    private String newPassword;
}
