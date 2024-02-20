package damcio.gymcms.offer;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import damcio.gymcms.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OfferService {
    private final OfferRepository offerRepository;

    public Offer createOffer(Offer offer){
        return offerRepository.save(offer);
    }

    public Offer getOfferById(Integer id){
        Optional<Offer> offer = offerRepository.findById(id);
        if (offer.isEmpty()) 
            throw new ResourceNotFoundException("Offer not found");
        return offer.get();
    }

    public List<Offer> getAllOffers(){
        return offerRepository.findAll();
    }

    public List<Offer> getActiveOffers(){
        return offerRepository.findByActive(true);
    }

    public Offer updateOffer(Offer offer){
        Optional<Offer> optionalExistingOffer = offerRepository.findById(offer.getId());
        if (optionalExistingOffer.isEmpty())
            throw new ResourceNotFoundException("Couldn't find offer to update");
        
        Offer existingOffer = optionalExistingOffer.get();
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
