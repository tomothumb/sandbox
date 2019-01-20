//
//  Posts.swift
//  AnimationPractice
//
//  Created by Tomoyuki Tsujimoto on 2019/01/20.
//

import Foundation



class Post {
    var name: String?
    var statusText: String?
    var statusImageName: String?
    var statusImageUrl: String?
    var profileImageName: String?
    var numLikes: Int?
    var numComments: Int?
}

class Posts {
    
    private var postLists = [Post]()
    
    func numberOfPosts() -> Int{
        return postLists.count
    }
    func members() -> Array<Any>{
        return postLists
    }
    
    init(){
        let postMark = Post()
        postMark.name = "Mark"
        postMark.statusText = "I am Mark"
        postMark.profileImageName = "smiling"
        postMark.statusImageName = "smiling"
        postMark.statusImageUrl = "https://placeimg.com/640/480/any"
        postMark.numLikes = 100
        postMark.numComments = 100
        
        let postSteave = Post()
        postSteave.name = "Steave"
        postSteave.statusText = "abcdefg ABCDEFG abcdefg ABCDEFG abcdefg ABCDEFG abcdefg ABCDEFG abcdefg ABCDEFG abcdefg ABCDEFG abcdefg ABCDEFG abcdefg \n\n ABCDEFG "
        postSteave.profileImageName = "heart"
        postSteave.statusImageName = "smiling"
        postSteave.statusImageUrl = "https://placeimg.com/640/550/any"
        postSteave.numLikes = 120
        postSteave.numComments = 130
        
        let postGandhi = Post()
        postGandhi.name = "Gandhi"
        postGandhi.statusText = "blah blah blah blah blah blah blah blah blah blah blah blah blah"
        postGandhi.profileImageName = "thumbs-up"
        postGandhi.statusImageName = "smiling"
        postGandhi.statusImageUrl = "https://placeimg.com/300/550/any"
        postGandhi.numLikes = 10
        postGandhi.numComments = 30
        
        postLists.append(postMark)
        postLists.append(postSteave)
        postLists.append(postGandhi)

    }
}
