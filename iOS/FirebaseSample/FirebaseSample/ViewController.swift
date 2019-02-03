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



class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        navigationItem.leftBarButtonItem = UIBarButtonItem(title: "Logout", style: .plain, target: self, action: #selector(handleLogout))
        
        if Auth.auth().currentUser?.uid == nil {
            perform(#selector(handleLogout), with: nil, afterDelay: 0)
//            handleLogout()
        }
    }
    
    
    @objc func handleLogout(){
        
        do {
            try Auth.auth().signOut()
        } catch let logoutError {
            print(logoutError)
        }
        
        let loginController = LoginController()
        present(loginController, animated: true, completion: nil)
    }


}

