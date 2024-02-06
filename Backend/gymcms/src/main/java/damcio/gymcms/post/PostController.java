package damcio.gymcms.post;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/posts")
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post){
        Post savedPost = postService.createPost(post);
        return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
    }

    @PreAuthorize("permitAll()")
    @GetMapping("{id}")
    public ResponseEntity<Post> getPostById(@PathVariable("id") Integer id){
        Optional<Post> post = postService.getPostById(id);
        return ResponseEntity.of(post);
    }

    @PreAuthorize("permitAll()")
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts(){
        List<Post> posts = postService.getAllPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/active")
    public ResponseEntity<List<Post>> getActivePosts(){
        List<Post> activePosts = postService.getActivePosts();
        return new ResponseEntity<>(activePosts, HttpStatus.OK);
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/search/title/{query}")
    public ResponseEntity<List<Post>> getPostsByTitle(@PathVariable("query") String query){
        List<Post> foundPosts = postService.getPostsByTitle(query);
        return new ResponseEntity<>(foundPosts, HttpStatus.OK);
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/search/author/{query}")
    public ResponseEntity<List<Post>> getPostsByAuthor(@PathVariable("query") String query){
        List<Post> foundPosts = postService.getPostsByAuthor(query);
        return new ResponseEntity<>(foundPosts, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Post> updatePost(@PathVariable("id") Integer id, @RequestBody Post post){
        post.setId(id);
        Post updatedPost = postService.updatePost(post);
        return new ResponseEntity<>(updatedPost, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deletePost(@PathVariable("id") Integer id){
        postService.deletePost(id);
        return new ResponseEntity<>("Post deleted", HttpStatus.OK);
    }
}
