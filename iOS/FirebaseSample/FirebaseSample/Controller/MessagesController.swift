//
//  ViewController.swift
//  FirebaseSample
//
//  Created by Tomoyuki Tsujimoto on 2019/01/27.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit
import Firebase
import FirebaseDatabase
import FirebaseAuth

//let docData = [
//    "name":"FOO",
//    "tel":"090-111",
//    "email":"foo@example.com"
//]
//
//let db = Firestore.firestore()
//
//var ref: DocumentReference? = nil
//
//// SET
//ref = db.collection("users").addDocument(add: docData) { err in
//    if let err = err {
//        print("ドキュメント追加失敗 \(err.localizedDescription)")
//    }else{
//        print("ドキュメント追加成功  ID: \(ref!.documentID) ")
//        UserDefaults.standard.set(ref!.documentID, forKey: "documentId")
//    }
//}
//
//// GET
//if let id = UserDefaults.standard.object(forKey: "documentId") as? String {
//    let db = Firestore.firestore()
//
//    let docRef = db.collection("users").document(id)
//    docRef.getDocument {(Document, error) in
//
//    }
//}
//
//// UPDATE
//if let id = userDef.object(forKey: "documentId") as? String {
//    let db = Firestore.firestore()
//
//    let docRef = db.collection("users").document(id)
//    docRef.updateData(["name": "BAR"], completion: {(error) in
//        if let err = error {
//            print("失敗 \(err.localizedDescription)")
//        }else{
//            print("成功")
//        }
//    })
//
//
//}
//
//
//
//// ストレージ
//// アップロード
//func fileUpload( name: String, image: UIImage){
//    let storage = Storage.storage()
//    let storageRef = storage.reference()
//    let spaceRef = storageRef.child("images/\(name)")
//    if let data = UIImageJPEGRepresentation(image, 1.0) {
//        let metadata = StorageMetadata()
//        metadata.contentType = "image/jpeg"
//
//        spaceRef.putData(data, metadata: metadata) { (metadata, error) in
//            if let err = error {
//                print("失敗 [\(name)] \(err.localizedDescription)")
//            } else {
//
//                print("成功")
//
//            }
//        }
//    }
//}
//
//// ダウンロード
//func fileDownload( name: String, complete: @escaping (URL?) -> Void ) {
//    let storage = Storage.storage()
//    let storageRef = storage.reference()
//    let spaceRef = storageRef.child("images/\(name)")
//
//    let subPath = self.libSubPath("images")
//
//    let filePath = subPath + "/" + name
//    let localURL = URL(fileURLWithPath: filePath)
//    spaceRef.write(toFile: localURL) {(url, error) in
//        if let err = error {
//            print("失敗 [\(name)] \(err.localizedDescription)")
//        }
//        complete(url)
//    }
//
//}
//
//// 削除
//func fileRemove( name: String) {
//    let storage = Storage.storage()
//    let storageRef = storage.reference()
//    let spaceRef = storageRef.child("images/\(name)")
//
////    let subPath = self.libSubPath("images")
////    let filePath = subPath + "/" + name
////    let localURL = URL(fileURLWithPath: filePath)
//
//    spaceRef.delete { error in
//        if let err = error {
//            print("失敗 [\(name)] \(err.localizedDescription)")
//        }
//        print("成功")
//
//    }
//
//}


class MessagesController: UITableViewController {

    let cellId = "cellId"
    override func viewDidLoad() {
        super.viewDidLoad()
        
        navigationItem.leftBarButtonItem = UIBarButtonItem(title: "Logout", style: .plain, target: self, action: #selector(handleLogout))
        
        
        navigationItem.rightBarButtonItem = UIBarButtonItem(image: #imageLiteral(resourceName: "new_message_icon"), style: .plain, target: self, action: #selector(handleNewMessage))
        
        checkIfUserIsLoggedIn()
        
        tableView.register(UserCell.self, forCellReuseIdentifier: cellId)
        
//        observeMessage()
    }
    
    var messages = [Message]()
    var messagesDictionary = [String: Message]()
    
    func observeUserMessages(){
        guard let uid = Auth.auth().currentUser?.uid else {
            return
        }
        // 送信主別
        let ref = Database.database().reference().child("user-messages").child(uid)
        ref.observe(DataEventType.childAdded, with: { (snapshot) in
            print(snapshot)
            // 送信主別のメッセージID
            let messageId = snapshot.key
            // 送信主別のメッセージの内容
            let messageReference = Database.database().reference().child("messages").child(messageId)
            
            messageReference.observeSingleEvent(of: DataEventType.value, with: { (snapshot) in
                
                if let dictionary = snapshot.value as? [String: AnyObject] {
                    let message = Message(dictionary: dictionary)
                    // 人別にまとめる
                    if let toId = message.toId {
                        self.messagesDictionary[toId] = message
                        self.messages = Array(self.messagesDictionary.values)
                        self.messages.sort(by: { (message1, message2) -> Bool in
                            return message1.timestamp!.intValue > message2.timestamp!.intValue
                        })
                    }
                    DispatchQueue.main.async {
                        self.tableView.reloadData()
                    }
                }
            }, withCancel: nil)
            
        }, withCancel: nil)
        
    }
    
    func observeMessage(){
        let ref = Database.database().reference().child("messages")
        ref.observe(DataEventType.childAdded, with: { (snapshot) in
            print(snapshot)
            
            if let dictionary = snapshot.value as? [String: AnyObject] {
                let message = Message(dictionary: dictionary)
//                self.messages.append(message)
                
                // 人別にまとめる
                if let toId = message.toId {
                    self.messagesDictionary[toId] = message
                    self.messages = Array(self.messagesDictionary.values)
                    
                    self.messages.sort(by: { (message1, message2) -> Bool in
                        return message1.timestamp!.intValue > message2.timestamp!.intValue
                    })

                    
                }
                // this will crash because of background thread, so lets call this on dispatch main async thread
                DispatchQueue.main.async {
                    self.tableView.reloadData()
                }
            }
        }, withCancel: nil)
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return messages.count
    }
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
//        let cell = UITableViewCell(style: UITableViewCell.CellStyle.subtitle, reuseIdentifier: "cellId")
        
        let cell = tableView.dequeueReusableCell(withIdentifier: cellId, for: indexPath) as! UserCell
        
        let message = messages[indexPath.row]
        cell.message = message
        
        return cell
    }
    
    func checkIfUserIsLoggedIn(){
        if Auth.auth().currentUser?.uid == nil {
            perform(#selector(handleLogout), with: nil, afterDelay: 0)
//            handleLogout()
        } else {
            fetchUserAndSetupNavBarTitle()
        }
    }
    
    func fetchUserAndSetupNavBarTitle(){
        
        guard let uid = Auth.auth().currentUser?.uid else {
            // for some reason uid = nil
            return
        }
        Database.database().reference().child("users").child(uid).observe(DataEventType.value, with: { (snapshot) in
//            print(snapshot)
            if let dictionary = snapshot.value as? [String: AnyObject] {
//                self.navigationItem.title = dictionary["name"] as? String
                let user = User(dictionary: dictionary)
                
                self.setupNavBarWithUser(user: user)
            }
        }, withCancel: nil)
    }
    
    
    func setupNavBarWithUser(user: User) {
        
        messages.removeAll()
        messagesDictionary.removeAll()
        tableView.reloadData()
        
        observeUserMessages()
        
        self.navigationItem.title = user.name
        let titleView = UIView()
        titleView.frame = CGRect(x: 0, y: 0, width: 100, height: 40)
        titleView.backgroundColor = .red

        let containerView = UIView()
        containerView.translatesAutoresizingMaskIntoConstraints = false
        titleView.addSubview(containerView)

        let profileImageView = UIImageView()
        profileImageView.translatesAutoresizingMaskIntoConstraints = false
        profileImageView.contentMode = .scaleAspectFill
        profileImageView.layer.cornerRadius = 20
        profileImageView.clipsToBounds = true
        if let profileImageUrl = user.profileImageUrl {
            profileImageView.loadImageUsingCacheWithUrlString(urlString: profileImageUrl)
        }

        containerView.addSubview(profileImageView)

        profileImageView.leftAnchor.constraint(equalTo: containerView.leftAnchor).isActive = true
        profileImageView.centerYAnchor.constraint(equalTo: containerView.centerYAnchor).isActive = true
        profileImageView.widthAnchor.constraint(equalToConstant: 40).isActive = true
        profileImageView.heightAnchor.constraint(equalToConstant: 40).isActive = true

        let nameLabel = UILabel()
        containerView.addSubview(nameLabel)

        nameLabel.text = user.name
        nameLabel.numberOfLines = 0
        nameLabel.translatesAutoresizingMaskIntoConstraints = false
        nameLabel.leftAnchor.constraint(equalTo: profileImageView.rightAnchor, constant: 5).isActive = true
        nameLabel.centerYAnchor.constraint(equalTo: profileImageView.centerYAnchor).isActive = true
        nameLabel.rightAnchor.constraint(equalTo: containerView.rightAnchor).isActive = true
        nameLabel.heightAnchor.constraint(equalTo: profileImageView.heightAnchor).isActive = true

        containerView.translatesAutoresizingMaskIntoConstraints = false
        containerView.centerXAnchor.constraint(equalTo: titleView.centerXAnchor).isActive = true
        containerView.centerYAnchor.constraint(equalTo: titleView.centerYAnchor).isActive = true
        
        self.navigationItem.titleView = titleView
        
//        titleView.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(showChatController)))
        
//        let button = UIButton()
//        button.setTitle(user.name, for: .normal)
//        button.addTarget(self, action: #selector(showChatController), for: .touchUpInside)
//        self.navigationItem.titleView = button

    }
    
    @objc func showChatControllerForUser(user: User){
        print(123)
        let chatLogController = ChatLogController(collectionViewLayout: UICollectionViewFlowLayout())
        chatLogController.user = user
        navigationController?.pushViewController(chatLogController, animated: true)
    }
    
    
    @objc func handleLogout(){
        do {
            try Auth.auth().signOut()
        } catch let logoutError {
            print(logoutError)
        }
        let loginController = LoginController()
        loginController.messagesController = self
        present(loginController, animated: true, completion: nil)
    }
    
    @objc func handleNewMessage(){

        let newMessageController = NewMessageController()
        newMessageController.messagesController = self
        let navController = UINavigationController(rootViewController: newMessageController)
        present(navController, animated: true, completion: nil)
    }
    
    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 72
    }
    
    
}
