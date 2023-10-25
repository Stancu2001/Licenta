package com.example.onetomany.controller;

import com.example.onetomany.DTO.GetCategoryDTO;
import com.example.onetomany.DTO.GetSubCategoryDTO;
import com.example.onetomany.DTO.SubCategoryDTO;
import com.example.onetomany.DTO.SubcategoryArgumentDTO;
import com.example.onetomany.entity.Category;
import com.example.onetomany.entity.SubCategory;
import com.example.onetomany.repository.CategoryRepository;
import com.example.onetomany.repository.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    // Operatii pentru entitatea Category

//    @GetMapping("/categories")
//    public List<Category> getAllCategories() {
//        List<Category> categories=categoryRepository.findAll();
//        List<GetCategoryDTO> response=new ArrayList<>();
//        for(Category category:categories){
//            response.add(new GetCategoryDTO(category))
//        }
//        return categoryRepository.findAll();
//    }
    @GetMapping("/all")
    public List<GetCategoryDTO> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<GetCategoryDTO> categoryDTOs = new ArrayList<>();

        for (Category category : categories) {
            List<String> subCategories = new ArrayList<>();
            for (SubCategory subCategory : category.getSubCategories()) {
                subCategories.add(subCategory.getTitle());
            }

            GetCategoryDTO categoryDTO = new GetCategoryDTO(category.getTitle(), subCategories,category.getId());
            categoryDTOs.add(categoryDTO);
        }

        return categoryDTOs;
    }

    @GetMapping("/{categoryId}")
    public Category getCategoryById(@PathVariable int categoryId) {
        return categoryRepository.findById(categoryId).orElse(null);
    }

    @PostMapping("/save")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Category createCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

//    @PutMapping("/{categoryId}")
//    public Category updateCategory(@PathVariable int categoryId, @RequestBody Category updatedCategory) {
//        Category category = categoryRepository.findById(categoryId).orElse(null);
//        if (category != null) {
//            category.setTitle(updatedCategory.getTitle());
//            return categoryRepository.save(category);
//        }
//        return null;
//    }
//@PutMapping("/{categoryId}")
//public ResponseEntity<?> updateCategory(@PathVariable int categoryId, @RequestBody Category updatedCategory) {
//    // Verifică dacă categoria există înainte de actualizare
//    Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
//    if (!categoryOptional.isPresent()) {
//        String errorMessage = "Categoria nu există.";
//        Map<String, String> errorResponse = new HashMap<>();
//        errorResponse.put("mesaj", errorMessage);
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
//    }
//
//    // Categoria există, procedează cu actualizarea
//    Category category = categoryOptional.get();
//    category.setTitle(updatedCategory.getTitle());
//
//    Category updatedCategory1 = categoryRepository.save(category);
//
//    return ResponseEntity.ok(updatedCategory1);
//}
@PutMapping("/{categoryId}")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public ResponseEntity<?> updateCategory(@PathVariable int categoryId, @RequestBody GetCategoryDTO updatedCategoryDTO) {
    // Verifică dacă categoria există înainte de actualizare
    Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
    if (!categoryOptional.isPresent()) {
        String errorMessage = "Categoria nu există.";
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("mesaj", errorMessage);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    // Categoria există, procedează cu actualizarea
    Category category = categoryOptional.get();
    category.setTitle(updatedCategoryDTO.getTitle());

    // Actualizează lista de subcategorii
    List<String> subcategoryTitles = updatedCategoryDTO.getSubcategories();
    List<SubCategory> subcategories = new ArrayList<>();
    if (subcategoryTitles != null) {
        for (String subcategoryTitle : subcategoryTitles) {
            SubCategory subcategory = new SubCategory(subcategoryTitle);
            subcategories.add(subcategory);
        }
    }
    category.setSubCategories(subcategories);

    Category updatedCategory = categoryRepository.save(category);

    // Converteste entitatea actualizată în obiectul DTO de răspuns
    GetCategoryDTO responseDTO = new GetCategoryDTO();
    responseDTO.setTitle(updatedCategory.getTitle());
    responseDTO.setId(updatedCategory.getId());
    // Setează subcategoriile utilizând lista de obiecte SubCategoryDTO
    List<String> subcategoriesResponse = new ArrayList<>();
    List<SubCategory> updatedSubcategories = updatedCategory.getSubCategories();
    if (updatedSubcategories != null) {
        for (SubCategory subcategory : updatedSubcategories) {
            subcategoriesResponse.add(subcategory.getTitle());
        }
    }
    responseDTO.setSubcategories(subcategoriesResponse);

    return ResponseEntity.ok(responseDTO);
}

    @GetMapping("/{categoryId}/subcategorie/{subCategoryId}")
    public SubCategory getSubCategoryById(@PathVariable int categoryId, @PathVariable int subCategoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (category != null) {
            return category.getSubCategories()
                    .stream()
                    .filter(subCategory -> subCategory.getId() == subCategoryId)
                    .findFirst()
                    .orElse(null);
        }
        return null;
    }
    @GetMapping("/{categoryId}/subcategories/{subCategoryId}")
    public SubCategoryDTO getSubCategoryTitleById(@PathVariable int categoryId, @PathVariable int subCategoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (category != null) {
            SubCategory subCategory = category.getSubCategories()
                    .stream()
                    .filter(sc -> sc.getId() == subCategoryId)
                    .findFirst()
                    .orElse(null);
            if (subCategory != null) {
                return new SubCategoryDTO(subCategory.getTitle());
            }
        }
        return null;
    }
    @DeleteMapping("/{categoryId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Map<String, String>> deleteCategory(@PathVariable int categoryId) {
        // Verifică dacă categoria există înainte de ștergere
        boolean categoryExists = categoryRepository.existsById(categoryId);

        if (!categoryExists) {
            String errorMessage = "Categoria nu există.";
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("mesaj", errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

        // Categoria există, procedează cu ștergerea
        categoryRepository.deleteById(categoryId);

        String successMessage = "Categoria a fost ștearsă cu succes.";
        Map<String, String> successResponse = new HashMap<>();
        successResponse.put("mesaj", successMessage);

        return ResponseEntity.ok(successResponse);
    }
    // Operatii pentru entitatea SubCategory

    @PostMapping("/subcategories")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public SubCategory createSubCategory(@RequestBody SubCategory subCategory) {
        return subCategoryRepository.save(subCategory);
    }

//    @GetMapping("/subcategories/{subCategoryId}")
//    public SubCategory getSubCategoryById(@PathVariable int subCategoryId) {
//        return subCategoryRepository.findById(subCategoryId).orElse(null);
//    }
@GetMapping("/subcategories/{id}")
public ResponseEntity<?> getSubCategoryById(@PathVariable int id) {
    Optional<SubCategory> subCategoryOptional = subCategoryRepository.findById(id);

    if (subCategoryOptional.isPresent()) {
        SubCategory subCategory = subCategoryOptional.get();
        GetSubCategoryDTO subCategoryDTO = new GetSubCategoryDTO(subCategory.getTitle(), subCategory.getContent());
        return ResponseEntity.ok(subCategoryDTO);
    } else {
        return ResponseEntity.notFound().build();
    }
}
    @GetMapping("/subcategory/{title}")
    public ResponseEntity<?> getSubCategory(@PathVariable String title) {
        SubCategory subCategory = subCategoryRepository.findByTitle(title);

        if (subCategory != null) {
            SubcategoryArgumentDTO subCategoryDTO = new SubcategoryArgumentDTO(subCategory.getId(),subCategory.getTitle(), subCategory.getContent());
            return ResponseEntity.ok(subCategoryDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
//    @GetMapping("/subcategoriesss/{subCategorytitle}")
//    public SubCategory getSubCategoryById(@PathVariable int subCategoryId) {
//        return subCategoryRepository.findById(subCategoryId);
//    }

    @PutMapping("/subcategories/{subCategoryId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public SubCategory updateSubCategory(@PathVariable int subCategoryId, @RequestBody SubCategory updatedSubCategory) {
        SubCategory subCategory = subCategoryRepository.findById(subCategoryId).orElse(null);
        if (subCategory != null) {
            subCategory.setTitle(updatedSubCategory.getTitle());
            subCategory.setContent(updatedSubCategory.getContent());
            return subCategoryRepository.save(subCategory);
        }
        return null;
    }

    @DeleteMapping("/subcategories/{subCategoryId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteSubCategory(@PathVariable int subCategoryId) {
        subCategoryRepository.deleteById(subCategoryId);
    }

    // Alte metode specifice combinate

//    @PostMapping("/{categoryId}/subcategories")
//    public SubCategory createSubCategoryForCategory(@PathVariable int categoryId, @RequestBody SubCategory subCategory) {
//        Category category = categoryRepository.findById(categoryId).orElse(null);
//        if (category != null) {
//            subCategory.setCategory(category);
//            return subCategoryRepository.save(subCategory);
//        }
//        return null;
//    }
@PostMapping("/{categoryId}/subcategories")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public ResponseEntity<?> createSubCategoryForCategory(@PathVariable int categoryId, @RequestBody SubCategory subCategory) {
    Category category = categoryRepository.findById(categoryId).orElse(null);

    if (category != null) {
        // Verificăm dacă titlul subcategoriei există deja în baza de date
        SubCategory existingSubCategory = subCategoryRepository.findByTitle(subCategory.getTitle());

        if (existingSubCategory != null) {
            // Returnăm un mesaj de eroare că titlul subcategoriei există deja
            String errorMessage = "Titlul subcategoriei există deja.";
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("mesaj", errorMessage);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        subCategory.setCategory(category);
        SubCategory createdSubCategory = subCategoryRepository.save(subCategory);
        return ResponseEntity.ok(createdSubCategory);
    } else {
        // Returnăm un mesaj de eroare că categoria nu a fost găsită
        String errorMessage = "Categoria nu a fost găsită.";
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
    }
}

    @GetMapping("/categories/{categoryId}/subcategories")
    public List<SubCategory> getSubCategoriesForCategory(@PathVariable int categoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (category != null) {
            return category.getSubCategories();
        }
        return null;
    }
}