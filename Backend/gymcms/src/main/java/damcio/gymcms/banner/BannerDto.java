package damcio.gymcms.banner;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class BannerDto {
    private Integer id;

    private String title;

    private String body;

    private Boolean active;

    private MultipartFile picture;
}
