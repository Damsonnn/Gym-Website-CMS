package damcio.gymcms.user;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import damcio.gymcms.exception.AllAdminsRemovalException;
import damcio.gymcms.exception.ResourceNotFoundException;
import damcio.gymcms.role.Role;
import damcio.gymcms.role.RoleEnum;
import damcio.gymcms.role.RoleRepository;
import damcio.gymcms.security.AuthenticationService;

import java.security.Principal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final AuthenticationService authenticationService;

    public User createUser(AddUserDto user) {
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setUsername(user.getUsername());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        Role role = roleRepository.findById(user.getRoleId())
            .orElseThrow(() -> new ResourceNotFoundException("Couldn't find user role"));

        newUser.setRole(role);
        return userRepository.save(newUser);
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(AddUserDto user, Integer id) {
        User existingUser = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Couldn't find user to update"));

        Role newRole = roleRepository.findById(user.getRoleId())
            .orElseThrow(() -> new ResourceNotFoundException("Couldn't find user role"));

        Role oldRole = existingUser.getRole();
        if (oldRole.getName() == RoleEnum.ADMIN && newRole.getName() == RoleEnum.USER
                && userRepository.findByRole(oldRole).size() < 2)
            throw new AllAdminsRemovalException("You can't change last admin to normal user");

        existingUser.setRole(roleRepository.findById(user.getRoleId()).get());
        existingUser.setUsername(user.getUsername());
        if (user.getPassword() != "") {
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(existingUser);
    }

    public void changePassword(Principal principal, ChangePasswordDto changePasswordDto){
        LoginUserDto loginData = new LoginUserDto(principal.getName(), changePasswordDto.getOldPassword());
        User user = authenticationService.authenticate(loginData);
        user.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
        userRepository.save(user);
    }

    public void deleteUser(Integer id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Couldn't find user to delete"));

        if (user.getRole().getName() == RoleEnum.ADMIN
                && userRepository.findByRole(user.getRole()).size() < 2)
            throw new AllAdminsRemovalException("Can't delete last admin user");

        userRepository.deleteById(id);
    }
}
