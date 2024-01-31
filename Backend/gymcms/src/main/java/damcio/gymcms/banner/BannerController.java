package damcio.gymcms.banner;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/banners")
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
public class BannerController {
    private final BannerService bannerService;

    @PostMapping
    public ResponseEntity<Banner> createBanner(@RequestBody Banner banner){
        Banner savedBanner = bannerService.createBanner(banner);
        return new ResponseEntity<>(savedBanner, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Banner> getBannerById(@PathVariable("id") Integer id){
        Optional<Banner> banner = bannerService.getBannerById(id);
        return ResponseEntity.of(banner);
    }

    @GetMapping
    public ResponseEntity<List<Banner>> getAllBanners(){
        List<Banner> banners = bannerService.getAllBanners();
        return new ResponseEntity<>(banners, HttpStatus.OK);
    }

    @GetMapping("/active")
    public ResponseEntity<List<Banner>> getActiveBanners(){
        List<Banner> activeBanners = bannerService.getActiveBanners();
        return new ResponseEntity<>(activeBanners, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Banner> updateBrand(@PathVariable("id") Integer id, @RequestBody Banner banner){
        banner.setId(id);
        Banner updatedBanner = bannerService.updateBanner(banner);
        return new ResponseEntity<>(updatedBanner, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteBanner(@PathVariable("id") Integer id){
        bannerService.deleteBanner(id);
        return new ResponseEntity<>("Banner deleted", HttpStatus.OK);
    }
}
