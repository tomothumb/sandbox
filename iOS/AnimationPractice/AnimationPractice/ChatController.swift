//
//  ChatController.swift
//  AnimationPractice
//
//  Created by Tomoyuki Tsujimoto on 2019/01/20.
//

import UIKit

struct ChatMessage {
    let text: String
    let isIncoming: Bool
}

class ChatController: UITableViewController{
    
    fileprivate let cellId = "id123"
    
    let chatMessages = [
        ChatMessage( text: "First message. First message.", isIncoming: true ),
        ChatMessage( text: "Second message. Second message. Second message. Second message.", isIncoming: false ),
        ChatMessage( text: "Third message. Third message. Third message. Third message. Third message. Third message. Third message.", isIncoming: false ),
        ChatMessage( text: "Forth message. Forth message. Forth message. Forth message.", isIncoming: true ),
    ]
//    let textMessages = [
//        "First message. First message.",
//        "Second message. Second message. Second message. Second message.",
//        "Third message. Third message. Third message. Third message. Third message. Third message. Third message.",
//        "Forth message. Forth message. Forth message. Forth message."
//    ]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        navigationItem.title = "Chat"
        navigationController?.navigationBar.prefersLargeTitles = true
        
        tableView.register(ChatMessageCell.self, forCellReuseIdentifier: cellId)
        tableView.separatorStyle = .none
        tableView.backgroundColor = UIColor(white: 0.95, alpha: 1)
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return chatMessages.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellId, for: indexPath) as! ChatMessageCell
        
        let chatMessage = chatMessages[indexPath.row]
//        cell.messageLabel.text = chatMessage.text
//        cell.isIncoming = chatMessage.isIncoming
        cell.chatMessage = chatMessage

        return cell
    }
}
