package damcio.gymcms.banner;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BannerService {
    private final BannerRepository bannerRepository;

    public Banner createBanner(Banner banner){
        return bannerRepository.save(banner);
    }

    public Optional<Banner> getBannerById(Integer id){
        return bannerRepository.findById(id);
    }

    public List<Banner> getAllBanners(){
        return bannerRepository.findAll();
    }

    public List<Banner> getActiveBanners(){
        return bannerRepository.findByActive(true);
    }

    public Banner updateBanner(Banner banner){
        Banner existingBanner = bannerRepository.findById(banner.getId()).get();
        existingBanner.setActive(banner.getActive());
        existingBanner.setBody(banner.getBody());
        existingBanner.setTitle(banner.getTitle());
        return bannerRepository.save(existingBanner);
    }

    public void deleteBanner(Integer id){
        bannerRepository.deleteById(id);
    }
}
