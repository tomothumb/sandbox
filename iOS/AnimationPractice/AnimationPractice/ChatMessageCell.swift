//
//  ChatMessageCell.swift
//  AnimationPractice
//
//  Created by Tomoyuki Tsujimoto on 2019/01/21.
//

import Foundation
import UIKit

class ChatMessageCell: UITableViewCell{
    let messageLabel = UILabel()
    let bubbleBackgroundView = UIView()
    
    var leadingConstraint: NSLayoutConstraint!
    var trailingConstraint: NSLayoutConstraint!
    
    var chatMessage: ChatMessage! {
        didSet {
            bubbleBackgroundView.backgroundColor = chatMessage.isIncoming ? .white : .darkGray
            messageLabel.textColor = chatMessage.isIncoming ? .black : .white
            messageLabel.text = chatMessage.text
            
            if chatMessage.isIncoming {
                leadingConstraint.isActive = true
                trailingConstraint.isActive = false
            } else {
                leadingConstraint.isActive = false
                trailingConstraint.isActive = true
            }
            
        }
    }
    
    //    var isIncoming: Bool! {
    //        didSet {
    //            bubbleBackgroundView.backgroundColor = isIncoming ? .white : .darkGray
    //            messageLabel.textColor = isIncoming ? .black : .white
    //        }
    //    }
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style:style, reuseIdentifier:reuseIdentifier)
        
        backgroundColor = .clear
        
        // 背景バブル
        bubbleBackgroundView.backgroundColor = UIColor.rgb(red: 230, green: 230, blue: 230)
        bubbleBackgroundView.translatesAutoresizingMaskIntoConstraints = false
        bubbleBackgroundView.layer.cornerRadius = 5
        addSubview(bubbleBackgroundView)
        
        addSubview(messageLabel)
        //        messageLabel.backgroundColor = .green
        messageLabel.text = "Some message. Some message. Some message. Some message. Some message. "
        messageLabel.font = UIFont.systemFont(ofSize: 13)
        //        messageLabel.frame = CGRect(x: 0, y: 0, width: 100, height: 100)
        
        messageLabel.translatesAutoresizingMaskIntoConstraints = false
        messageLabel.numberOfLines = 0
        
        // setup some constraints for label
        let constraints = [
            messageLabel.topAnchor.constraint(equalTo: topAnchor, constant:16),
            messageLabel.bottomAnchor.constraint(equalTo: bottomAnchor, constant:-16),
            //            messageLabel.widthAnchor.constraint(equalToConstant: 250),
            messageLabel.widthAnchor.constraint(lessThanOrEqualToConstant: 250),
            //背景用
            bubbleBackgroundView.topAnchor.constraint(equalTo: messageLabel.topAnchor, constant:-8),
            bubbleBackgroundView.leadingAnchor.constraint(equalTo: messageLabel.leadingAnchor, constant:-8),
            bubbleBackgroundView.bottomAnchor.constraint(equalTo: messageLabel.bottomAnchor, constant:8),
            bubbleBackgroundView.trailingAnchor.constraint(equalTo: messageLabel.trailingAnchor, constant:8),
            ]
        NSLayoutConstraint.activate(constraints)
        
        leadingConstraint = messageLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16)
        leadingConstraint.isActive = false
        trailingConstraint = messageLabel.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16)
        trailingConstraint.isActive = true
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

