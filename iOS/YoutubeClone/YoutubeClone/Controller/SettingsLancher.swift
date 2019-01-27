//
//  SettingsLancher.swift
//  YoutubeClone
//
//  Created by Tomoyuki Tsujimoto on 2019/01/27.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit

class Setting: NSObject {
    let name: String
    let imageName: String
    
    init(name: String, imageName: String) {
        self.name = name
        self.imageName = imageName
    }
}

class SettingLancher: NSObject, UICollectionViewDataSource, UICollectionViewDelegate, UICollectionViewDelegateFlowLayout {
    
    var homeController: HomeController?
    let blackView = UIView()
    
    let collectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        let cv = UICollectionView(frame: .zero, collectionViewLayout: layout)
        cv.backgroundColor = .white
        return cv
    }()
    
    let cellHeight: CGFloat = 50
    let cellId = "cellId"
    let settings: [Setting] = {
        return [Setting(name: "Settings", imageName: "settings"),
                Setting(name: "Terms & privacy policy", imageName: "settings"),
        Setting(name: "Send Feedback", imageName: "settings"),
        Setting(name: "Help", imageName: "settings"),
        Setting(name: "Switch Account", imageName: "settings"),
        Setting(name: "Cancel", imageName: "settings")]
    }()
    
    // Moreボタンアクション
    @objc func showSettings(){
        // Show menu
        if let window = UIApplication.shared.keyWindow {
            blackView.backgroundColor = .black
            
            blackView.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(handleDismissMoreblock)))
            
            window.addSubview(blackView)
            
            window.addSubview(collectionView)
            let height:CGFloat = CGFloat(settings.count) * cellHeight
            
            let y = window.frame.height - height
            collectionView.frame = CGRect(x: 0, y: window.frame.height, width: window.frame.width, height: height)
            
            blackView.frame = window.frame
            blackView.alpha = 0
            UIView.animate(withDuration: 0.2, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
                self.blackView.alpha = 0.85
                self.collectionView.frame = CGRect(x: 0, y: y, width: self.collectionView.frame.width, height: self.collectionView.frame.height)
            }, completion: nil)
        }
    }

    @objc func handleDismissMoreblock(setting: Setting){
        
        UIView.animate(withDuration: 0.5, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            
            self.blackView.alpha = 0
            if let window = UIApplication.shared.keyWindow {
                self.collectionView.frame = CGRect(x: 0, y: window.frame.height, width: self.collectionView.frame.width, height: self.collectionView.frame.height)
            }
        }) { (completed: Bool) in
            if !setting.isKind(of: UITapGestureRecognizer.self) && setting.name != "Cancel" {
                self.homeController?.showControllerForSetting(setting: setting)
            }
        }
        
    }
    
    override init() {
        super.init()
        collectionView.delegate = self
        collectionView.dataSource = self
        collectionView.register(SettingCell.self, forCellWithReuseIdentifier: cellId)
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return settings.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: cellId, for: indexPath) as! SettingCell
        let setting = settings[indexPath.item]
        cell.setting = setting
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: collectionView.frame.width, height: cellHeight)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAt section: Int) -> CGFloat {
        return 0
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {

        let setting = self.settings[indexPath.item]
        handleDismissMoreblock(setting: setting)
    }
}
