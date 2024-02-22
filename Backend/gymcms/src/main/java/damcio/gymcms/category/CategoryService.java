package damcio.gymcms.category;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import damcio.gymcms.exception.ResourceNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category getCategoryById(Integer id){
        return categoryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<Category> getActiveCategories() {
        return categoryRepository.findByActive(true);
    }

    public Category updateCategory(Category category){
        Category exitingCategory = categoryRepository.findById(category.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Couldn't find category to update"));

        exitingCategory.setActive(category.getActive());
        exitingCategory.setName(category.getName());
        return categoryRepository.save(exitingCategory);
    }

    public void deleteCategory(Integer id){
        if (categoryRepository.existsById(id))
            throw new ResourceNotFoundException("Couldn't find category to delete");
            
        categoryRepository.deleteById(id);
    }
}
