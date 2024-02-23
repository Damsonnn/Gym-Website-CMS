package damcio.gymcms.security;

import org.springframework.stereotype.Repository;

import damcio.gymcms.user.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
    public Optional<PasswordResetToken> findByToken(String token);

    public Optional<PasswordResetToken> findByUser(User user);
}
