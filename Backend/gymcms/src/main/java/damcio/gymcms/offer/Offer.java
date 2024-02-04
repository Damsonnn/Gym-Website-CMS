package damcio.gymcms.offer;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private Double price;

    @Column(length = 10000)
    private String body;

    private Double discount;

    private Boolean active;
}
