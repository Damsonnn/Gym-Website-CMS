package damcio.gymcms.banner;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import damcio.gymcms.exception.ResourceNotFoundException;
import damcio.gymcms.fileMetadata.FileMetadata;
import damcio.gymcms.fileMetadata.FileMetadataService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BannerService {
    private final BannerRepository bannerRepository;

    private final FileMetadataService fileMetadataService;

    public Banner createBanner(BannerDto bannerDto){
        Banner banner = new Banner();
        banner.setTitle(bannerDto.getTitle());
        banner.setBody(bannerDto.getBody());
        banner.setActive(bannerDto.getActive());
        FileMetadata fileMetadata = fileMetadataService.createFile(bannerDto.getPicture(), Integer.toString(banner.getId()), "banners");
        banner.setPicture(fileMetadata);
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

    public Banner updateBanner(BannerDto banner){
        Banner existingBanner = bannerRepository.findById(banner.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Couldn't find banner to update"));
        
        existingBanner.setActive(banner.getActive());
        existingBanner.setBody(banner.getBody());
        existingBanner.setTitle(banner.getTitle());
        if (banner.getPicture().isEmpty()){
            FileMetadata fileMetdata = fileMetadataService.createFile(banner.getPicture(), String.valueOf(existingBanner.getId()), "banners");
            existingBanner.setPicture(fileMetdata);
        }
        
        return bannerRepository.save(existingBanner);
    }

    public void deleteBanner(Integer id){
        Banner bannerToDelete = bannerRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Couldn't find banner to delete"));
        
        fileMetadataService.deleteFile(bannerToDelete.getPicture());
        bannerRepository.deleteById(id);
    }
}
