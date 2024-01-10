package damcio.gymcms.location;

import damcio.gymcms.banner.BannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;
    private final BannerRepository bannerRepository;

    public Location createLocation(Location location){
        return locationRepository.save(location);
    }

    public Optional<Location> getLocationById(Integer id){
        return locationRepository.findById(id);
    }

    public List<Location> getAllLocation(){
        return locationRepository.findAll();
    }

    public Location updateLocation(Location location){
        Location existingLocation = locationRepository.findById(location.getId()).get();
        existingLocation.setCity(location.getCity());
        existingLocation.setAddress(location.getAddress());
        existingLocation.setPhoneNumber(location.getPhoneNumber());
        existingLocation.setEmail(location.getEmail());
        return locationRepository.save(existingLocation);
    }

    public void deleteLocation(Integer id){
        bannerRepository.deleteById(id);
    }
}
