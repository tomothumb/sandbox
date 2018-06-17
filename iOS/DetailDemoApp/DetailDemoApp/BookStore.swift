//
//  BookStore.swift
//  DetailDemoApp
//
//  Created by Tomoyuki Tsujimoto on 2018/06/17.
//  Copyright © 2018年 Socialis. All rights reserved.
//

import Foundation

class BookStore {
    var bookList: [Book] = []
    
    init() {
        var newBook = Book()
        newBook.title = "TTIITTLLEE"
        newBook.author = "AAUUTTHHOORR"
        newBook.description = "DDEESSCCRRIIPPTTIIOONN"
        bookList.append(newBook)
        
        newBook = Book()
        newBook.title = "TTIITTLLEE2"
        newBook.author = "AAUUTTHHOORR2"
        newBook.description = "DDEESSCCRRIIPPTTIIOONN2"
        bookList.append(newBook)
    }
}
