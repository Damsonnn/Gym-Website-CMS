package damcio.gymcms.role;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;

    public List<Role> getAllRoles(){
        return roleRepository.findAll();
    }

    public Optional<Role> findById(Integer id){
        return roleRepository.findById(id);
    }
}
