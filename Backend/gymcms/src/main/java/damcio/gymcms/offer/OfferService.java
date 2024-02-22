package damcio.gymcms.offer;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import damcio.gymcms.exception.ResourceNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OfferService {
    private final OfferRepository offerRepository;

    public Offer createOffer(Offer offer){
        return offerRepository.save(offer);
    }

    public Offer getOfferById(Integer id){
        return offerRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Offer not found"));
    }

    public List<Offer> getAllOffers(){
        return offerRepository.findAll();
    }

    public List<Offer> getActiveOffers(){
        return offerRepository.findByActive(true);
    }

    public Offer updateOffer(Offer offer){
        Offer existingOffer = offerRepository.findById(offer.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Couldn't find offer to update"));
        
        existingOffer.setActive(offer.getActive());
        existingOffer.setName(offer.getName());
        existingOffer.setBody(offer.getBody());
        existingOffer.setPrice(offer.getPrice());
        existingOffer.setDiscount(offer.getDiscount());
        return offerRepository.save(existingOffer);
    }

    public void deleteOffer(Integer id){
        if (!offerRepository.existsById(id))
            throw new ResourceNotFoundException("Couldn't find offer to delete");

        offerRepository.deleteById(id);
    }
}
