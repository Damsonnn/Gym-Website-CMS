package damcio.gymcms.offer;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OfferService {
    private final OfferRepository offerRepository;

    public Offer createOffer(Offer offer){
        return offerRepository.save(offer);
    }

    public Optional<Offer> getOfferById(Integer id){
        return offerRepository.findById(id);
    }

    public List<Offer> getAllOffers(){
        return offerRepository.findAll();
    }

    public List<Offer> getActiveOffers(){
        return offerRepository.findByActive(true);
    }

    public Offer updateOffer(Offer offer){
        Offer existingOffer = offerRepository.findById(offer.getId()).get();
        existingOffer.setActive(offer.getActive());
        existingOffer.setName(offer.getName());
        existingOffer.setBody(offer.getBody());
        existingOffer.setPrice(offer.getPrice());
        existingOffer.setDiscount(offer.getDiscount());
        return offerRepository.save(existingOffer);
    }

    public void deleteOffer(Integer id){
        offerRepository.deleteById(id);
    }
}
