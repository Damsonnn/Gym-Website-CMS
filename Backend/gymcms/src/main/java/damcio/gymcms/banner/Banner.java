package damcio.gymcms.banner;

import damcio.gymcms.fileMetadata.FileMetadata;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Table(name = "banner")
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "body", length = 500)
    private String body;

    @Column(name = "active", nullable = false)
    private Boolean active = false;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "picture_id")
    private FileMetadata picture;
}
