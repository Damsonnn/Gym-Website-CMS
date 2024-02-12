package damcio.gymcms.opinion;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OpinionService {
    private final OpinionRepository opinionRepository;

    public Opinion createOpinion(Opinion opinion) {
        return opinionRepository.save(opinion);
    }

    public Optional<Opinion> getOpinionById(Integer id){
        return opinionRepository.findById(id);
    }

    public List<Opinion> getAllOpinions() {
        return opinionRepository.findAll();
    }

    public List<Opinion> getActiveOpinions() {
        return opinionRepository.findByActive(true);
    }

    public Opinion updateOpinion(Opinion opinion){
        Opinion existingOpinion = opinionRepository.findById(opinion.getId()).get();
        existingOpinion.setActive(opinion.getActive());
        existingOpinion.setAuthor(opinion.getAuthor());
        existingOpinion.setBody(opinion.getBody());
        return opinionRepository.save(existingOpinion);
    }

    public void deleteOpinion(Integer id){
        opinionRepository.deleteById(id);
    }
}
