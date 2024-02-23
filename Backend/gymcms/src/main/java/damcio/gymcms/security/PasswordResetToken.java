package damcio.gymcms.security;

import java.util.Date;
import java.util.Calendar;

import damcio.gymcms.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Table(name = "password_reset_token")
public class PasswordResetToken {
    private static final Integer EXPIRATION = 60;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "token", length = 36)
    private String token;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "expiry_date")
    private Date expiryDate;

    public void resetExpiryDate(){
        Calendar now = Calendar.getInstance();
        now.add(Calendar.MINUTE, EXPIRATION);
        setExpiryDate(now.getTime());
    }

    public void expireToken(){
        Calendar now = Calendar.getInstance();
        setExpiryDate(now.getTime());
    }
}
