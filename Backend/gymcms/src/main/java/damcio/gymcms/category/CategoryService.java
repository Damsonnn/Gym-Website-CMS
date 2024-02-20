package damcio.gymcms.category;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import damcio.gymcms.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category getCategoryById(Integer id){
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isEmpty())
            throw new ResourceNotFoundException("Category not found");

        return category.get(); 
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<Category> getActiveCategories() {
        return categoryRepository.findByActive(true);
    }

    public Category updateCategory(Category category){
        Optional<Category> optionalExitingCategory = categoryRepository.findById(category.getId());
        if (optionalExitingCategory.isEmpty())
            throw new ResourceNotFoundException("Couldn't find category to update");
        
        Category exitingCategory = optionalExitingCategory.get();
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
