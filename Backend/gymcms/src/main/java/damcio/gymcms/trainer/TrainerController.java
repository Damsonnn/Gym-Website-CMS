package damcio.gymcms.trainer;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@PreAuthorize("isAuthenticated()")
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/trainers")
@RequiredArgsConstructor
public class TrainerController {
    private final TrainerService trainerService;

    @PostMapping
    public ResponseEntity<Trainer> createTrainer(@RequestBody Trainer trainer){
        Trainer savedTrainer = trainerService.createTrainer(trainer);
        return new ResponseEntity<>(savedTrainer, HttpStatus.CREATED);
    }

    @PreAuthorize("permitAll()")
    @GetMapping("{id}")
    public ResponseEntity<Trainer> getTrainerById(@PathVariable("id") Integer id){
        Optional<Trainer> trainer = trainerService.getTrainerById(id);
        return ResponseEntity.of(trainer);
    }

    @GetMapping
    public ResponseEntity<List<Trainer>> getAllTrainers(){
        List<Trainer> trainers = trainerService.getAllTrainers();
        return new ResponseEntity<>(trainers, HttpStatus.OK);
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/active")
    public ResponseEntity<List<Trainer>> getActiveTrainers(){
        List<Trainer> activeTrainers = trainerService.getActiveTrainers();
        return new ResponseEntity<>(activeTrainers, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Trainer> updateTrainer(@PathVariable("id") Integer id, @RequestBody Trainer trainer){
        trainer.setId(id);
        Trainer updatedTrainer = trainerService.updateTrainer(trainer);
        return new ResponseEntity<>(updatedTrainer, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTrainer(@PathVariable("id") Integer id){
        trainerService.deleteTrainer(id);
        return new ResponseEntity<>("Trainer deleted", HttpStatus.OK);
    }
}
