//
//  LoginController+handlers.swift
//  FirebaseSample
//
//  Created by Tomoyuki Tsujimoto on 2019/02/05.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit
import FirebaseAuth
import FirebaseDatabase
import FirebaseStorage

extension LoginController: UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    @objc func handleSelectProfileImageView(){
        let picker = UIImagePickerController()
        // 操作
        picker.delegate = self
        // 編集
        picker.allowsEditing = true
        
        present(picker, animated: true, completion: nil)
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        
        var selectedImageFromPicker: UIImage?
        
        if let editedImage = info[UIImagePickerController.InfoKey.editedImage] as? UIImage {
            // 編集
//            print((editedImage as! UIImage).size)
            selectedImageFromPicker = editedImage
        }else if let originalImage = info[UIImagePickerController.InfoKey.originalImage] as? UIImage {
            // 選択
//            print((originalImage as! UIImage).size)
            selectedImageFromPicker = originalImage
        }
        
        if let selectedImage = selectedImageFromPicker {
            profileImageView.image = selectedImage
        }
        // 閉じる
        dismiss(animated: true, completion: nil)
    }
    
    
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        print("Canceled Picker")
        // 閉じる
        dismiss(animated: true, completion: nil)
    }

    // ログインアクション
    func handleLogin(){
        guard let email = emailTextField.text , let password = passwordTextField.text else{
            print("Form is not valid")
            return
        }
        
        // 認証
        Auth.auth().signIn(withEmail: email, password: password) { (authResult, error) in
            if error != nil {
                print(error!)
                return
            }
            guard let uid = authResult?.user.uid else {
                return
            }
            self.messagesController?.fetchUserAndSetupNavBarTitle()
            // success
            self.dismiss(animated: true, completion: nil)
        }
    }
    
    // 登録アクション
    func handleRegister(){
        guard let email = emailTextField.text , let password = passwordTextField.text , let name = nameTextField.text else{
            print("Form is not valid")
            return
        }
        
        // 認証
        Auth.auth().createUser(withEmail: email, password: password) { (authResult, error) in
            if error != nil {
                print(error!)
                return
            }

            guard let uid = authResult?.user.uid else {
                return
            }
            
            // success
//            let imageName = NSUUID().uuidString // Unique string
            
            // Store
            let storageRef = Storage.storage().reference()
            let storageRefChild = storageRef.child("user_profile_pictures").child("\(uid).jpg")
//            let storageRefChild = storageRef.child("user_profile_pictures").child("\(imageName).jpg")

            if let profileImage = self.profileImageView.image, let uploadData = profileImage.jpegData(compressionQuality: 0.1){
//            if let uploadData = self.profileImageView.image!.jpegData(compressionQuality: 0.1) {

//            if let uploadData = self.profileImageView.image!.pngData() {
                storageRefChild.putData(uploadData, metadata: nil, completion: { (metadata, error) in
                    if error != nil {
                        print(error!)
                        return
                    }
                    
                    storageRefChild.downloadURL(completion: { (url, err) in
                        if let err = err {
                            print("Unable to retrieve URL due to error: \(err.localizedDescription)")
                        }
                        let profilePicUrl = url?.absoluteString
                        print("Profile Image successfully uploaded into storage with url: \(profilePicUrl ?? "" )")
                        
                        let values:[String : AnyObject] = [
                            "name" : name as AnyObject,
                            "email" : email as AnyObject,
                            "profileImageUrl" : profilePicUrl! as AnyObject
                        ]
                        self.registerUserIntoDatabaseWithID(uid:uid, values: values)
                    })
                })
            }
        }
    }
    
    private func registerUserIntoDatabaseWithID(uid: String, values: [String: AnyObject]){
        // success
        var ref: DatabaseReference!
//        ref = Database.database().reference()
        ref = Database.database().reference(fromURL: "https://sampleproj-5274f.firebaseio.com/")
        let userReference = ref.child("users").child(uid)
//        ref.updateChildValues(values)
        userReference.updateChildValues(values, withCompletionBlock: { (err, ref) in
            if err != nil {
                print(err!)
                return
            }
            print("Saved user successfully into Firevase DB")
            
//            self.messagesController?.fetchUserAndSetupNavBarTitle()
//            self.messagesController?.navigationItem.title = values["name"] as? String
            let user = User(dictionary: values)
            self.messagesController?.setupNavBarWithUser(user: user)

            self.dismiss(animated: true, completion: nil)
            
        })
//        ref.child("someValue").setValue(["num": 123])
    }
}
