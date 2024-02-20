package damcio.gymcms.location;

import damcio.gymcms.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;

    public Location createLocation(Location location) {
        return locationRepository.save(location);
    }

    public Location getLocationById(Integer id) {
        Optional<Location> location = locationRepository.findById(id);
        if (location.isEmpty())
            throw new ResourceNotFoundException("Location not found");

        return location.get();
    }

    public List<Location> getAllLocation() {
        return locationRepository.findAll();
    }

    public Location updateLocation(Location location) {
        Optional<Location> optionalExistingLocation = locationRepository.findById(location.getId());
        if (optionalExistingLocation.isEmpty())
            throw new ResourceNotFoundException("Couldn't find location to update");

        Location existingLocation = optionalExistingLocation.get();
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
