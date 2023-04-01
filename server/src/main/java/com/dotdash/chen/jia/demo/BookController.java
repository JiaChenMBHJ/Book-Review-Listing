package com.dotdash.chen.jia.demo;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class BookController {

    @Autowired
    public BookService bookService;
    public final static Logger logger = Logger.getLogger(BookService.class);

    @CrossOrigin
    @RequestMapping(value = "/search", method = RequestMethod.GET)
    public ResponseEntity<List<Book>> searchBooks(@RequestParam(value="q") String query){
        List<Book> bookResults = bookService.getBooks(query);
        if(bookResults.isEmpty()){
            logger.info(String.format("Query %s returned an empty list.", query));
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Book>>(bookResults, HttpStatus.OK);
    }
}
