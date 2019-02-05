//
//  LoginController+handlers.swift
//  FirebaseSample
//
//  Created by Tomoyuki Tsujimoto on 2019/02/05.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit

extension LoginController: UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    @objc func handleSelectProfileImageView(){
        let picker = UIImagePickerController()
        picker.delegate = self
        
        present(picker, animated: true, completion: nil)
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        
//        print(info)
    }
    
    
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        print("Canceled Picker")
        dismiss(animated: true, completion: nil)
    }

}
