package damcio.gymcms.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import damcio.gymcms.role.RoleRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public User createUser(AddUserDto user){
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setUsername(user.getUsername());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setRole(roleRepository.findById(user.getRoleId()).get());
        return userRepository.save(newUser);
    }

    public Optional<User> getUserById(Integer id){
        return userRepository.findById(id);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User updateUser(AddUserDto user, Integer id){
        User existingUser = userRepository.findById(id).get();
        existingUser.setUsername(user.getUsername());
        if (user.getPassword() != "") {
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        existingUser.setRole(roleRepository.findById(user.getRoleId()).get());
        return userRepository.save(existingUser);
    }

    public void deleteUser(Integer id){
        userRepository.deleteById(id);
    }
}
