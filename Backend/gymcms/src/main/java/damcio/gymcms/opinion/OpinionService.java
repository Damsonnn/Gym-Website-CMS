package damcio.gymcms.opinion;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import damcio.gymcms.exception.ResourceNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OpinionService {
    private final OpinionRepository opinionRepository;

    public Opinion createOpinion(Opinion opinion) {
        return opinionRepository.save(opinion);
    }

    public Opinion getOpinionById(Integer id){
        return opinionRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Opinion not found"));
    }

    public List<Opinion> getAllOpinions() {
        return opinionRepository.findAll();
    }

    public List<Opinion> getActiveOpinions() {
        return opinionRepository.findByActive(true);
    }

    public Opinion updateOpinion(Opinion opinion){
        Opinion existingOpinion = opinionRepository.findById(opinion.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Couldn't find opinion to update"));
        
        existingOpinion.setActive(opinion.getActive());
        existingOpinion.setAuthor(opinion.getAuthor());
        existingOpinion.setBody(opinion.getBody());
        return opinionRepository.save(existingOpinion);
    }

    public void deleteOpinion(Integer id){
        if (!opinionRepository.existsById(id))
            throw new ResourceNotFoundException("Couldn't find opinion to delete");
            
        opinionRepository.deleteById(id);
    }
}
