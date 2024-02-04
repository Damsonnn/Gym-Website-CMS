package damcio.gymcms.trainer;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Trainer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String firstName;

    private String lastName;

    private Integer age;

    @Column(length = 10000)
    private String about;

    private String facebookLink;

    private String twitterLink;

    private String instagramLink;

    private Boolean active;
}
