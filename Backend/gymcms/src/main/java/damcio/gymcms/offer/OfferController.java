package damcio.gymcms.offer;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/offers")
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequiredArgsConstructor
public class OfferController {
    private final OfferService offerService;

    @PostMapping
    public ResponseEntity<Offer> createOffer(@RequestBody Offer offer){
        Offer savedOffer = offerService.createOffer(offer);
        return new ResponseEntity<>(savedOffer, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Offer> getOfferById(@PathVariable("id") Integer id){
        Optional<Offer> offer = offerService.getOfferById(id);
        return ResponseEntity.of(offer);
    }

    @GetMapping
    public ResponseEntity<List<Offer>> getAllOffers(){
        List<Offer> offers = offerService.getAllOffers();
        return new ResponseEntity<>(offers, HttpStatus.OK);
    }

    @GetMapping("/active")
    public ResponseEntity<List<Offer>> getActiveOffers(){
        List<Offer> activeOffers = offerService.getActiveOffers();
        return new ResponseEntity<>(activeOffers, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Offer> updateOffer(@PathVariable("id") Integer id, @RequestBody Offer offer){
        offer.setId(id);
        Offer updatedOffer = offerService.updateOffer(offer);
        return new ResponseEntity<>(updatedOffer, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteOffer(@PathVariable("id") Integer id){
        offerService.deleteOffer(id);
        return new ResponseEntity<>("Offer deleted", HttpStatus.OK);
    }
}
