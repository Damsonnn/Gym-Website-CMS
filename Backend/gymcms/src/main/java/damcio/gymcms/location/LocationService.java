package damcio.gymcms.location;

import damcio.gymcms.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;

    public Location createLocation(Location location) {
        return locationRepository.save(location);
    }

    public Location getLocationById(Integer id) {
        return locationRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Location not found"));
    }

    public List<Location> getAllLocation() {
        return locationRepository.findAll();
    }

    public Location updateLocation(Location location) {
        Location existingLocation = locationRepository.findById(location.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Couldn't find location to update"));

        existingLocation.setCity(location.getCity());
        existingLocation.setAddress(location.getAddress());
        existingLocation.setPhoneNumber(location.getPhoneNumber());
        existingLocation.setEmail(location.getEmail());
        return locationRepository.save(existingLocation);
    }

    public void deleteLocation(Integer id) {
        if (!locationRepository.existsById(id)) 
            throw new ResourceNotFoundException("Couldn't find location to delete");

        locationRepository.deleteById(id);
    }
}
