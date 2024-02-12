package damcio.gymcms.post;

import damcio.gymcms.category.Category;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title", nullable = false, length = 150)
    private String title;

    @Column(name = "body", nullable = false, length = 50000)
    private String body;

    @Column(name = "active", nullable = false)
    private Boolean active = false;

    @Column(name = "author", nullable = false, length = 40)
    private String author;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
}
