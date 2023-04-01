package com.dotdash.chen.jia.demo;

import lombok.Data;

@Data
public class Book {
    private String title;
    private String author;
    private String imgUrl;

    public Book(String title, String author, String imgUrl) {
        this.title = title;
        this.author = author;
        this.imgUrl = imgUrl;
    }

    @Override
    public String toString(){
        return String.format("Title: %s Author: %s Url: %s", title, author, imgUrl);
    }
}
