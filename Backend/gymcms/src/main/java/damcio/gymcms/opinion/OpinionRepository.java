package damcio.gymcms.opinion;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OpinionRepository extends JpaRepository<Opinion, Integer> {
    List<Opinion> findByActive(Boolean active);
}
