package damcio.gymcms.trainer;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import damcio.gymcms.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TrainerService {
    private final TrainerRepository trainerRepository;

    public Trainer createTrainer(Trainer trainer){
        return trainerRepository.save(trainer);
    }

    public Trainer getTrainerById(Integer id){
        Optional<Trainer> trainer = trainerRepository.findById(id);
        if (trainer.isEmpty())
            throw new ResourceNotFoundException("Trainer not found");

        return trainer.get(); 
    }

    public List<Trainer> getAllTrainers(){
        return trainerRepository.findAll();
    }

    public List<Trainer> getActiveTrainers(){
        return trainerRepository.findByActive(true);
    }

    public Trainer updateTrainer(Trainer trainer){
        Optional<Trainer> optionalExistingTrainer = trainerRepository.findById(trainer.getId());
        if (optionalExistingTrainer.isEmpty())
            throw new ResourceNotFoundException("Couldn't find trainer to update");
        
        Trainer existingTrainer = optionalExistingTrainer.get();
        existingTrainer.setAbout(trainer.getAbout());
        existingTrainer.setAge(trainer.getAge());
        existingTrainer.setActive(trainer.getActive());
        existingTrainer.setFirstName(trainer.getFirstName());
        existingTrainer.setLastName(trainer.getLastName());
        existingTrainer.setFacebookLink(trainer.getFacebookLink());
        existingTrainer.setInstagramLink(trainer.getInstagramLink());
        existingTrainer.setTwitterLink(trainer.getTwitterLink());
        return trainerRepository.save(existingTrainer);
    }

    public void deleteTrainer(Integer id){
        if (trainerRepository.existsById(id))
            throw new ResourceNotFoundException("Couldn't find trainer to delete");
            
        trainerRepository.deleteById(id);
    }
}
