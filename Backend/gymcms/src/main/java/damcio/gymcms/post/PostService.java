package damcio.gymcms.post;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import damcio.gymcms.exception.ResourceNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public Post getPostById(Integer id) {
        return postRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Post not found"));
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public List<Post> getActivePosts() {
        return postRepository.findByActive(true);
    }

    public List<Post> getPostsByTitle(String title) {
        return postRepository.findByActiveAndTitleLike(true, title);
    }

    public List<Post> getPostsByAuthor(String author) {
        return postRepository.findByActiveAndAuthorLike(true, author);
    }

    public Post updatePost(Post post){
        Post existingPost = postRepository.findById(post.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Couldn't find post to update"));

        existingPost.setActive(post.getActive());
        existingPost.setBody(post.getBody());
        existingPost.setCategory(post.getCategory());
        existingPost.setTitle(post.getTitle());
        existingPost.setAuthor(post.getAuthor());
        return postRepository.save(existingPost);
    }

    public void deletePost(Integer id){
        if (!postRepository.existsById(id))
            throw new ResourceNotFoundException("Couldn't find post to delete");

        postRepository.deleteById(id);
    }
}
