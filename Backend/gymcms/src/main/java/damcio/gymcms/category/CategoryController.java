package damcio.gymcms.category;

import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/categories")
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category){
        Category savedCategory = categoryService.createCategory(category);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable("id") Integer id){
        Optional<Category> category = categoryService.getCategoryById(id);
        return ResponseEntity.of(category);
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories(){
        List<Category> categories = categoryService.getAllCategories();
        return new ResponseEntity<>(categories,HttpStatus.OK);
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/active")
    public ResponseEntity<List<Category>> getActiveCategories(){
        List<Category> activeCategories = categoryService.getActiveCategories();
        return new ResponseEntity<>(activeCategories, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable("id") Integer id, @RequestBody Category category){
        category.setId(id);
        Category updatedCategory = categoryService.updateCategory(category);
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable("id") Integer id){
        categoryService.deleteCategory(id);
        return new ResponseEntity<>("Category deleted", HttpStatus.OK);
    }
}
