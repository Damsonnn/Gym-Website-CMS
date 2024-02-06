package damcio.gymcms.post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findByActive(Boolean active);

    List<Post> findByActiveAndTitleLike(Boolean active, String title);

    List<Post> findByActiveAndAuthorLike(Boolean active, String author);
}
