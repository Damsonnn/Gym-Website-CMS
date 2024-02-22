package damcio.gymcms.banner;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import damcio.gymcms.exception.ResourceNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BannerService {
    private final BannerRepository bannerRepository;

    public Banner createBanner(Banner banner){
        return bannerRepository.save(banner);
    }

    public Banner getBannerById(Integer id){
        return bannerRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Banner not found"));
    }

    public List<Banner> getAllBanners(){
        return bannerRepository.findAll();
    }

    public List<Banner> getActiveBanners(){
        return bannerRepository.findByActive(true);
    }

    public Banner updateBanner(Banner banner){
        Banner existingBanner = bannerRepository.findById(banner.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Couldn't find banner to update"));
        
        existingBanner.setActive(banner.getActive());
        existingBanner.setBody(banner.getBody());
        existingBanner.setTitle(banner.getTitle());
        return bannerRepository.save(existingBanner);
    }

    public void deleteBanner(Integer id){
        if (bannerRepository.existsById(id))
            throw new ResourceNotFoundException("Couldn't find banner to change");
        
        bannerRepository.deleteById(id);
    }
}
