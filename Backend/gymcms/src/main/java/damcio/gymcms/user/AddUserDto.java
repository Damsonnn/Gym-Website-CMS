package damcio.gymcms.user;

import lombok.Data;

@Data
public class AddUserDto {
    private String username;

    private String password;

    private String email;

    private Integer roleId;
}
