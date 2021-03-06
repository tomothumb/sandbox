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
        
        tableView.allowsMultipleSelectionDuringEditing = true
        
    }
    
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        return true
    }
    
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        print(indexPath.row)
        
        guard let uid = Auth.auth().currentUser?.uid else {
            return
        }
        
        let message = self.messages[indexPath.row]
        
        if let chatPartnerId = message.chatPartnerId(){
            Database.database().reference().child("user-messages").child(uid).child(chatPartnerId).removeValue { (error, ref) in
                
                if error != nil {
                    print("Failed to delete message: ", error!)
                    return
                }
                
                self.messagesDictionary.removeValue(forKey: chatPartnerId)
                self.attemptReloadOfTable()
                
//                self.messages.remove(at: indexPath.row)
//                self.tableView.deleteRows(at: [indexPath], with: UITableView.RowAnimation.automatic)
            }
            
        }

    }
    
    var messages = [Message]()
    var messagesDictionary = [String: Message]()
    
    func observeUserMessages(){
        guard let uid = Auth.auth().currentUser?.uid else {
            return
        }
        // 送信主別
        let ref = Database.database().reference().child("user-messages").child(uid)
        // 追加
        ref.observe(DataEventType.childAdded, with: { (snapshot) in
//            print(snapshot)
            // チャット相手のID
            let userId = snapshot.key
            Database.database().reference().child("user-messages").child(uid).child(userId).observe(.childAdded, with: { (snapshot) in
                
                let messageId = snapshot.key
                self.fetchMessageWithMessageId( messageId: messageId)
                
            }, withCancel: nil)
            
        }, withCancel: nil)
        
        // 削除
        ref.observe(DataEventType.childRemoved, with: { (snapshot) in
            
//            print(snapshot.key)
//            print(self.messagesDictionary)
            self.messagesDictionary.removeValue(forKey: snapshot.key)
            self.attemptReloadOfTable()
            
        }, withCancel: nil)
    }
    
    // メッセージを読み込む
    private func fetchMessageWithMessageId(messageId: String){
        // 送信主別のメッセージの内容
        let messageReference = Database.database().reference().child("messages").child(messageId)
        
        messageReference.observeSingleEvent(of: DataEventType.value, with: { (snapshot) in
            
            if let dictionary = snapshot.value as? [String: AnyObject] {
                let message = Message(dictionary: dictionary)
                // 人別にまとめる
                if let chatPartnerId = message.chatPartnerId() {
                    self.messagesDictionary[chatPartnerId] = message
                }
                // リロードタイマー
                self.attemptReloadOfTable()
            }
        }, withCancel: nil)
        
    }
    
    private func attemptReloadOfTable(){
        // リロードタイマー
        self.timer?.invalidate()
        self.timer = Timer.scheduledTimer(timeInterval: 0.1, target: self, selector: #selector(self.handleReloadTable), userInfo: nil, repeats: false)
    }
    
    
    var timer: Timer?
    
    @objc func handleReloadTable() {
        self.messages = Array(self.messagesDictionary.values)
        self.messages.sort(by: { (message1, message2) -> Bool in
            return message1.timestamp!.intValue > message2.timestamp!.intValue
        })

        DispatchQueue.main.async {
            self.tableView.reloadData()
        }
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
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let message = messages[indexPath.row]
//        message.toId
//        message.fromId
        
        guard let chatPartnerId = message.chatPartnerId() else {
            return
        }

        let ref = Database.database().reference().child("users").child(chatPartnerId)
        ref.observe(DataEventType.value, with: { (snapshot) in
//            print(snapshot)
            guard let dictionary = snapshot.value as? [String: AnyObject] else {
                return
            }

            let user = User(dictionary: dictionary)
            user.id = chatPartnerId
            self.showChatControllerForUser(user: user)

            
        }, withCancel: nil)
        
        
    }
    
    
}
