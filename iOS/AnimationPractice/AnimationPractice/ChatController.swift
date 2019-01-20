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
    let date: Date
}

class ChatController: UITableViewController{
    
    fileprivate let cellId = "id123"
    
    let messagesFromServer = [
        ChatMessage( text: "First message. First message.", isIncoming: true, date: Date.dateFromCustomString(customString: "12/01/2018") ),
        ChatMessage( text: "Second message. Second message. Second message. Second message.", isIncoming: false, date: Date.dateFromCustomString(customString: "12/01/2018") ),
        ChatMessage( text: "Third message. Third message. Third message. Third message. Third message. Third message. Third message.", isIncoming: false, date: Date.dateFromCustomString(customString: "12/01/2018") ),
        ChatMessage( text: "Forth message. Forth message. Forth message. Forth message.", isIncoming: true, date: Date.dateFromCustomString(customString: "09/01/2018") ),
        ChatMessage( text: "2First message. First message.", isIncoming: true, date: Date.dateFromCustomString(customString: "01/18/2019") ),
        ChatMessage( text: "2Second message. Second message. Second message. Second message.", isIncoming: false, date: Date.dateFromCustomString(customString: "01/18/2019") ),
        ChatMessage( text: "2Third message. Third message. Third message. Third message. Third message. Third message. Third message.", isIncoming: false, date: Date.dateFromCustomString(customString: "01/21/2019") ),
        ChatMessage( text: "2Forth message. Forth message. Forth message. Forth message.", isIncoming: true, date: Date.dateFromCustomString(customString: "01/18/2019") ),
        ChatMessage( text: "3First message. First message.", isIncoming: true, date: Date.dateFromCustomString(customString: "01/20/2019") ),
        ChatMessage( text: "3Second message. Second message. Second message. Second message.", isIncoming: false, date: Date.dateFromCustomString(customString: "01/20/2019") ),
        ChatMessage( text: "3Third message. Third message. Third message. Third message. Third message. Third message. Third message.", isIncoming: false, date: Date.dateFromCustomString(customString: "01/20/2019") ),
        ChatMessage( text: "3Forth message. Forth message. Forth message. Forth message.", isIncoming: true, date: Date.dateFromCustomString(customString: "01/20/2019") ),
        ]
    
    var chatMessages = [[ChatMessage]]()
    
//    let chatMessages = [
//        [
//            ChatMessage( text: "First message. First message.", isIncoming: true, date: Date.dateFromCustomString(customString: "12/01/2018") ),
//            ChatMessage( text: "Second message. Second message. Second message. Second message.", isIncoming: false, date: Date.dateFromCustomString(customString: "12/01/2018") ),
//            ChatMessage( text: "Third message. Third message. Third message. Third message. Third message. Third message. Third message.", isIncoming: false, date: Date.dateFromCustomString(customString: "12/01/2018") ),
//            ChatMessage( text: "Forth message. Forth message. Forth message. Forth message.", isIncoming: true, date: Date.dateFromCustomString(customString: "12/01/2018") ),
//            ],
//        [
//            ChatMessage( text: "2First message. First message.", isIncoming: true, date: Date.dateFromCustomString(customString: "01/18/2019") ),
//            ChatMessage( text: "2Second message. Second message. Second message. Second message.", isIncoming: false, date: Date.dateFromCustomString(customString: "01/18/2019") ),
//            ChatMessage( text: "2Third message. Third message. Third message. Third message. Third message. Third message. Third message.", isIncoming: false, date: Date.dateFromCustomString(customString: "01/18/2019") ),
//            ChatMessage( text: "2Forth message. Forth message. Forth message. Forth message.", isIncoming: true, date: Date.dateFromCustomString(customString: "01/18/2019") ),
//            ],
//        [
//            ChatMessage( text: "3First message. First message.", isIncoming: true, date: Date.dateFromCustomString(customString: "01/20/2019") ),
//            ChatMessage( text: "3Second message. Second message. Second message. Second message.", isIncoming: false, date: Date.dateFromCustomString(customString: "01/20/2019") ),
//            ChatMessage( text: "3Third message. Third message. Third message. Third message. Third message. Third message. Third message.", isIncoming: false, date: Date.dateFromCustomString(customString: "01/20/2019") ),
//            ChatMessage( text: "3Forth message. Forth message. Forth message. Forth message.", isIncoming: true, date: Date.dateFromCustomString(customString: "01/20/2019") ),
//            ]
//    ]
    
    fileprivate func attemptToAssembleGroupedMessage(){
        
        let groupedMessages = Dictionary(grouping: messagesFromServer) { (element) -> Date in
            return element.date
        }
        
        let sortedKeys = groupedMessages.keys.sorted()
        sortedKeys.forEach { (key) in
            let values = groupedMessages[key]
            //            print(values ?? "")
            chatMessages.append(values ?? [])
        }
        
////        groupedMessages.keys
////        groupedMessages.values
//        groupedMessages.keys.forEach { (key) in
////            print(key)
//            let values = groupedMessages[key]
////            print(values ?? "")
//            
//            chatMessages.append(values ?? [])
//        }
        
        
//        print (groupedMessages)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        attemptToAssembleGroupedMessage()
        
        navigationItem.title = "Chat"
        navigationController?.navigationBar.prefersLargeTitles = true
        
        tableView.register(ChatMessageCell.self, forCellReuseIdentifier: cellId)
        tableView.separatorStyle = .none
        tableView.backgroundColor = UIColor(white: 0.95, alpha: 1)
    }
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return chatMessages.count
    }
    
    class DateHeaderLabel: UILabel {
        
        override init(frame: CGRect) {
            super.init(frame:frame)
            textAlignment = .center
            textColor = .white
            font = UIFont.boldSystemFont(ofSize: 11)
            backgroundColor = UIColor.rgb(red: 0, green: 150, blue: 0)
            translatesAutoresizingMaskIntoConstraints = false // enables auto layout
        }
        
        required init?(coder aDecoder: NSCoder) {
            fatalError("init(coder:) has not been implemented")
        }
        
        override var intrinsicContentSize: CGSize {
            let originalContentSize = super.intrinsicContentSize
            let height = originalContentSize.height + 10
            let width = originalContentSize.width + 20
            layer.cornerRadius = height / 2
            layer.masksToBounds = true
            return CGSize(width: width, height: height)
        }
    }
    
    override func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let label = DateHeaderLabel()
        
        if let firstMessageInSection = chatMessages[section].first {
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "MM/dd/yyyy"
            let dateString = dateFormatter.string(from: firstMessageInSection.date)
            label.text = dateString
            
            let containerView = UIView()
            containerView.addSubview(label)
            
            label.centerXAnchor.constraint(equalTo: containerView.centerXAnchor).isActive = true
            label.centerYAnchor.constraint(equalTo: containerView.centerYAnchor).isActive = true
            
            return containerView
        }
        return nil
    }
    
//    override func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
//        if let firstMessageInSection = chatMessages[section].first {
//            let dateFormatter = DateFormatter()
//            dateFormatter.dateFormat = "MM/dd/yyyy"
//            let dateString = dateFormatter.string(from: firstMessageInSection.date)
//            return dateString
//        }
//        return "Section: \(Date())"
//    }

    override func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 50
    }
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return chatMessages[section].count
        //        return chatMessages.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellId, for: indexPath) as! ChatMessageCell
        
        let chatMessage = chatMessages[indexPath.section][indexPath.row]
        //        let chatMessage = chatMessages[indexPath.row]
        //        cell.messageLabel.text = chatMessage.text
        //        cell.isIncoming = chatMessage.isIncoming
        cell.chatMessage = chatMessage
        
        return cell
    }
}
