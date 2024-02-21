package damcio.gymcms.location;  // Changed package name

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/locations")
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequiredArgsConstructor
public class LocationController {
    private final LocationService locationService;

    @PostMapping
    public ResponseEntity<Location> createLocation(@RequestBody Location location){
        Location savedLocation = locationService.createLocation(location);
        return new ResponseEntity<>(savedLocation, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable("id") Integer id){
        Location location = locationService.getLocationById(id);
        return new ResponseEntity<>(location, HttpStatus.OK);
    }

    @PreAuthorize("permitAll()")
    @GetMapping
    public ResponseEntity<List<Location>> getAllLocations(){
        List<Location> locations = locationService.getAllLocation();
        return new ResponseEntity<>(locations, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Location> updateLocation(@PathVariable("id") Integer id, @RequestBody Location location){
        location.setId(id);
        Location updatedLocation = locationService.updateLocation(location);
        return new ResponseEntity<>(updatedLocation, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteLocation(@PathVariable("id") Integer id){
        locationService.deleteLocation(id);
        return new ResponseEntity<>("Location deleted", HttpStatus.OK);
    }
}