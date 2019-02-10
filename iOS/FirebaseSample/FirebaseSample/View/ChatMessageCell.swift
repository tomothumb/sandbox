//
//  ChatMessageCell.swift
//  FirebaseSample
//
//  Created by Tomoyuki Tsujimoto on 2019/02/10.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit

class ChatMessageCell: UICollectionViewCell {

    let textView: UITextView = {
        let tv = UITextView()
        tv.text = "sample"
        tv.font = UIFont.systemFont(ofSize: 16)
        tv.translatesAutoresizingMaskIntoConstraints = false
        tv.backgroundColor = .clear
        tv.textColor = .white
        return tv
    }()
    
    static let blueColor = UIColor(r: 0, g: 137, b: 240)
    var bubbleWidthAnchor: NSLayoutConstraint?
    var bubbleRightAnchor: NSLayoutConstraint?
    var bubbleLeftAnchor: NSLayoutConstraint?
    let bubbleView: UIView = {
        let v = UIView()
        v.backgroundColor = blueColor
        v.translatesAutoresizingMaskIntoConstraints = false
        // 角丸
        v.layer.cornerRadius = 16
        v.layer.masksToBounds = true
        return v
    }()
    
    let profileImageView: UIImageView = {
        let iv = UIImageView()
        iv.image = UIImage(named:"")
        iv.backgroundColor = .black
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.layer.cornerRadius = 16
        iv.layer.masksToBounds = true
        iv.contentMode = .scaleAspectFill

        return iv
    }()
    
    override init(frame: CGRect) {
        super.init(frame:frame)
        
        addSubview(bubbleView)
        addSubview(textView)
        addSubview(profileImageView)

        profileImageView.leftAnchor.constraint(equalTo: self.leftAnchor, constant: 8).isActive = true
        profileImageView.bottomAnchor.constraint(equalTo: self.bottomAnchor).isActive = true
        profileImageView.widthAnchor.constraint(equalToConstant: 32).isActive = true
        profileImageView.heightAnchor.constraint(equalToConstant: 32).isActive = true

        bubbleView.topAnchor.constraint(equalTo: self.topAnchor).isActive = true
        bubbleWidthAnchor = bubbleView.widthAnchor.constraint(equalToConstant: 200)
        bubbleWidthAnchor?.isActive = true
        bubbleView.heightAnchor.constraint(equalTo: self.heightAnchor).isActive = true

        bubbleRightAnchor = bubbleView.rightAnchor.constraint(equalTo: self.rightAnchor, constant: -8)
        bubbleRightAnchor?.isActive = true

        bubbleLeftAnchor = bubbleView.leftAnchor.constraint(equalTo: profileImageView.rightAnchor, constant: 8)
        bubbleLeftAnchor?.isActive = false

        
        textView.leftAnchor.constraint(equalTo: bubbleView.leftAnchor, constant: 8).isActive = true
        textView.topAnchor.constraint(equalTo: self.topAnchor).isActive = true
        textView.rightAnchor.constraint(equalTo: bubbleView.rightAnchor).isActive = true
        textView.heightAnchor.constraint(equalTo: self.heightAnchor).isActive = true
        
        
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
}
