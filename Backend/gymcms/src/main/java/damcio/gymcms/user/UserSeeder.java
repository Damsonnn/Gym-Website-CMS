package damcio.gymcms.user;

import damcio.gymcms.role.Role;
import damcio.gymcms.role.RoleEnum;
import damcio.gymcms.role.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Component
@RequiredArgsConstructor
@Order(2)
public class UserSeeder implements CommandLineRunner {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        loadAdmin("root", "root", "root@example.com");
        loadAdmin("postman", "postman", "postman@example.com");
        loadUser("user", "user", "user@example.com");
    }

    private void loadAdmin(String username, String password, String email) {
        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.ADMIN);

        User rootUser = new User();
        rootUser.setUsername(username);
        rootUser.setPassword(passwordEncoder.encode(password));
        rootUser.setRole(optionalRole.get());
        rootUser.setEmail(email);

        userRepository.save(rootUser);
    }

    private void loadUser(String username, String password, String email) {
        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.USER);

        User postmanUser = new User();
        postmanUser.setUsername(username);
        postmanUser.setPassword(passwordEncoder.encode(password));
        postmanUser.setRole(optionalRole.get());
        postmanUser.setEmail(email);

        userRepository.save(postmanUser);
    }
}
