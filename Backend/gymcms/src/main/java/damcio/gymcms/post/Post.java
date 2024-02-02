package damcio.gymcms.post;

import damcio.gymcms.category.Category;
import damcio.gymcms.user.User;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    private String body;

    private Boolean active;

    private String author;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
}
