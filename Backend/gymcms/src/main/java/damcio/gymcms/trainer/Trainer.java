package damcio.gymcms.trainer;

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
@Table(name = "trainer")
public class Trainer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Column(name = "age")
    private Integer age;

    @Column(length = 10000)
    private String about;

    @Column(name = "facebook_link", length = 60)
    private String facebookLink;

    @Column(name = "twitter_link", length = 60)
    private String twitterLink;

    @Column(name = "instagram_link", length = 60)
    private String instagramLink;

    @Column(name = "active", nullable = false)
    private Boolean active = false;
}
