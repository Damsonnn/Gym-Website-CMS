package damcio.gymcms.post;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public Optional<Post> getPostById(Integer id) {
        return postRepository.findById(id);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public List<Post> getActivePosts() {
        return postRepository.findByActive(true);
    }

    public Post updatePost(Post post){
        Post existingPost = postRepository.findById(post.getId()).get();
        existingPost.setActive(post.getActive());
        existingPost.setBody(post.getBody());
        existingPost.setCategory(post.getCategory());
        existingPost.setTitle(post.getTitle());
        existingPost.setAuthor(post.getAuthor());
        return postRepository.save(existingPost);
    }

    public void deletePost(Integer id){
        postRepository.deleteById(id);
    }
}
