package damcio.gymcms.security;

import damcio.gymcms.email.EmailService;
import damcio.gymcms.exception.ResourceNotFoundException;
import damcio.gymcms.exception.TokenExpiredException;
import damcio.gymcms.exception.UserAuthenticationFailedException;
import damcio.gymcms.user.LoginUserDto;
import damcio.gymcms.user.User;
import damcio.gymcms.user.UserRepository;
import lombok.RequiredArgsConstructor;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public User authenticate(LoginUserDto input) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getUsername(),
                        input.getPassword()));
        } catch (Exception ex) {
            throw new UserAuthenticationFailedException("Wrong credentials");
        }

        return userRepository.findByUsername(input.getUsername())
                .orElseThrow();
    }

    public void resetPassword(String email){
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("No user with that username"));

        String token = UUID.randomUUID().toString();
        PasswordResetToken passwordResetToken = new PasswordResetToken(token, user);
        passwordResetTokenRepository.save(passwordResetToken);
        emailService.sendPasswordResetToken(passwordResetToken);
    }

    public void resetPasswordChange(String token, String password){
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
            .orElseThrow(() -> new ResourceNotFoundException("Didn't find this token"));

        Date now = Calendar.getInstance().getTime();
        if (resetToken.getExpiryDate().before(now)) throw new TokenExpiredException("Token for password change expired");
        
        resetToken.getUser().setPassword(password);
        userRepository.save(resetToken.getUser());
    }
}
