package damcio.gymcms.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import damcio.gymcms.exception.AllAdminsRemovalException;
import damcio.gymcms.exception.ResourceNotFoundException;
import damcio.gymcms.exception.UserAuthenticationFailedException;
import damcio.gymcms.role.Role;
import damcio.gymcms.role.RoleEnum;
import damcio.gymcms.role.RoleRepository;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import javax.swing.text.html.Option;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public User createUser(AddUserDto user) {
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setUsername(user.getUsername());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        Optional<Role> role = roleRepository.findById(user.getRoleId());
        if (role.isEmpty())
            throw new ResourceNotFoundException("Couldn't find user role");

        newUser.setRole(role.get());
        return userRepository.save(newUser);
    }

    public User getUserById(Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty())
            throw new ResourceNotFoundException("User not found");

        return user.get();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(AddUserDto user, Integer id) {
        Optional<User> optionalExistingUser = userRepository.findById(id);
        if (optionalExistingUser.isEmpty())
            throw new ResourceNotFoundException("Couldn't find user to update");

        User existingUser = optionalExistingUser.get();

        Optional<Role> newRole = roleRepository.findById(user.getRoleId());
        if (newRole.isEmpty())
            throw new ResourceNotFoundException("Couldn't find user role");

        Role oldRole = existingUser.getRole();
        if (oldRole.getName() == RoleEnum.ADMIN && newRole.get().getName() == RoleEnum.USER
                && userRepository.findByRole(oldRole).size() < 2)
            throw new AllAdminsRemovalException("You can't change last admin to normal user");

        existingUser.setRole(roleRepository.findById(user.getRoleId()).get());
        existingUser.setUsername(user.getUsername());
        if (user.getPassword() != "") {
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(existingUser);
    }

    public void changePassword(ChangePasswordDto changePasswordDto){
        Optional<User> optionalUser = userRepository.findById(changePasswordDto.getUserId());
        if (optionalUser.isEmpty())
            throw new ResourceNotFoundException("Couldn't find user to change password");

        User user = optionalUser.get();
        if (user.getPassword() != passwordEncoder.encode(changePasswordDto.getOldPassword()))
            throw new UserAuthenticationFailedException("Wrong password");

        user.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
        userRepository.save(user);
    }

    public void deleteUser(Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty())
            throw new ResourceNotFoundException("Couldn't find user to delete");

        if (user.get().getRole().getName() == RoleEnum.ADMIN
                && userRepository.findByRole(user.get().getRole()).size() < 2)
            throw new AllAdminsRemovalException("Can't delete last admin user");

        userRepository.deleteById(id);
    }
}
