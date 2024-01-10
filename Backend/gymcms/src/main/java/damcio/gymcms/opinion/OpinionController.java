package damcio.gymcms.opinion;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/opinions")
@RequiredArgsConstructor
public class OpinionController {
    private final OpinionService opinionService;

    @PostMapping
    public ResponseEntity<Opinion> createOpinion(@RequestBody Opinion opinion){
        Opinion savedOpinion = opinionService.createOpinion(opinion);
        return new ResponseEntity<>(savedOpinion, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Opinion> getOpinionById(@PathVariable("id") Integer id){
        Optional<Opinion> opinion = opinionService.getOpinionById(id);
        return ResponseEntity.of(opinion);
    }

    @GetMapping
    public ResponseEntity<List<Opinion>> getAllOpinions(){
        List<Opinion> opinions = opinionService.getAllOpinions();
        return new ResponseEntity<>(opinions, HttpStatus.OK);
    }

    @GetMapping("/active")
    public ResponseEntity<List<Opinion>> getActiveOpinions(){
        List<Opinion> activeOpinions = opinionService.getActiveOpinions();
        return new ResponseEntity<>(activeOpinions, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Opinion> updateOpinion(@PathVariable("id") Integer id, @RequestBody Opinion opinion){
        opinion.setId(id);
        Opinion updatedOpinion = opinionService.updateOpinion(opinion);
        return new ResponseEntity<>(updatedOpinion, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteOpinion(@PathVariable("id") Integer id){
        opinionService.deleteOpinion(id);
        return new ResponseEntity<>("Opinion deleted", HttpStatus.OK);
    }
}