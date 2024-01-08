package damcio.gymcms.category;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Optional<Category> getCategoryById(Integer id){
        return categoryRepository.findById(id);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<Category> getActiveCategories() {
        return categoryRepository.findByActive(true);
    }

    public Category updateCategory(Category category){
        Category exitingCategory = categoryRepository.findById(category.getId()).get();
        exitingCategory.setActive(category.getActive());
        exitingCategory.setName(category.getName());
        return categoryRepository.save(exitingCategory);
    }

    public void deleteCategory(Integer id){
        categoryRepository.deleteById(id);
    }
}
