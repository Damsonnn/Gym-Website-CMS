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
        loadRootUser();
        loadPostmanUser();
    }

    private void loadRootUser() {
        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.ADMIN);

        User rootUser = new User();
        rootUser.setUsername("root");
        rootUser.setPassword(passwordEncoder.encode("root"));
        rootUser.setRole(optionalRole.get());
        rootUser.setEmail("test@gmail.com");

        userRepository.save(rootUser);
    }

    private void loadPostmanUser() {
        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.ADMIN);

        User postmanUser = new User();
        postmanUser.setUsername("postman");
        postmanUser.setPassword(passwordEncoder.encode("postman"));
        postmanUser.setRole(optionalRole.get());
        postmanUser.setEmail("test@gmail.com");

        userRepository.save(postmanUser);
    }
}
