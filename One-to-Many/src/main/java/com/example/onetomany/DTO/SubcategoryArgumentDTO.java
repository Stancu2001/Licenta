package com.example.onetomany.DTO;

public class SubcategoryArgumentDTO {
    int id;
    String title;
    String content;

    public SubcategoryArgumentDTO(int id, String title, String content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }

    public SubcategoryArgumentDTO() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
