package damcio.gymcms.banner;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import damcio.gymcms.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BannerService {
    private final BannerRepository bannerRepository;

    public Banner createBanner(Banner banner){
        return bannerRepository.save(banner);
    }

    public Banner getBannerById(Integer id){
        Optional<Banner> banner = bannerRepository.findById(id);
        if (banner.isEmpty())
            throw new ResourceNotFoundException("Banner not found");
        
        return banner.get();
    }

    public List<Banner> getAllBanners(){
        return bannerRepository.findAll();
    }

    public List<Banner> getActiveBanners(){
        return bannerRepository.findByActive(true);
    }

    public Banner updateBanner(Banner banner){
        Optional<Banner> optionalExistingBanner = bannerRepository.findById(banner.getId());
        if (optionalExistingBanner.isEmpty())
            throw new ResourceNotFoundException("Couldn't find banner to update");
        
        Banner existingBanner = optionalExistingBanner.get();
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
