package com.example.onetomany.DTO;

import java.util.List;

public class GetCategoryDTO {
    private String title;
    private List<String> subcategories;
    private int id;
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getSubcategories() {
        return subcategories;
    }

    public void setSubcategories(List<String> subcategories) {
        this.subcategories = subcategories;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public GetCategoryDTO(String title, List<String> subcategories, int id) {
        this.title = title;
        this.subcategories = subcategories;
        this.id = id;
    }

    public GetCategoryDTO() {
    }
}
