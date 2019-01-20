//
//  ViewController.swift
//  AnimationPractice
//
//  Created by Tomoyuki Tsujimoto on 2019/01/18.
//

import UIKit

let cellId = "cellId"

let posts = Posts()

//class ViewController: UIViewController {
class FeedController: UICollectionViewController, UICollectionViewDelegateFlowLayout {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let memoryCapacity = 500 * 1024 * 1024
        let discCapacity = 500 * 1024 * 1024
        let urlCache = URLCache(memoryCapacity: memoryCapacity, diskCapacity: discCapacity, diskPath: "myDiskPath")
        URLCache.shared = urlCache

        navigationItem.title = "Feed"

        collectionView?.alwaysBounceVertical = true
        collectionView?.backgroundColor = UIColor(white: 0.90, alpha: 1)

        collectionView?.register(FeedCell.self, forCellWithReuseIdentifier: cellId)

    }

    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        
        return posts.numberOfPosts()
    }

    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let feedCell = collectionView.dequeueReusableCell(withReuseIdentifier: cellId, for: indexPath) as! FeedCell
        
        feedCell.post = posts.members()[indexPath.item] as? Post
        feedCell.feedController = self
        
        return feedCell
//        return collectionView.dequeueReusableCell(withReuseIdentifier: cellId, for: indexPath)
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        
        if let statusText = (posts.members()[indexPath.item] as! Post).statusText {
            let rect = NSString(string: statusText).boundingRect(with: CGSize(width: view.frame.width, height: 1000), options: NSStringDrawingOptions.usesFontLeading.union(NSStringDrawingOptions.usesLineFragmentOrigin), attributes: [NSAttributedString.Key.font : UIFont.systemFont(ofSize: 11
                )], context: nil)
            
            let knownHeight:CGFloat = 8 + 44 + 4 + 4 + 150 + 8 + 24 + 8 + 0.5 + 8 + 30
            return CGSize(width:view.frame.width,height: rect.height + knownHeight + 16)
        }
        return CGSize(width: view.frame.width, height: 300)
    }

    // Status bar を消す
//    override var prefersStatusBarHidden: Bool { return true }

//    override var preferredStatusBarStyle: UIStatusBarStyle = .lightContent

    
//    @objc func zoomAnimateStatusImg(){
//        let view = UIView()
//        view.backgroundColor = UIColor.red
//        view.frame = statusImageView.frame
//        addSubview(view)
//    }
//
//    @objc func zoomAnimateProfileImg(){
//        let view = UIView()
//        view.backgroundColor = UIColor.red
//        view.frame = profileImageView.frame
//        addSubview(view)
//    }

    let blackBackgroundView = UIView()
    let zoomImageView = UIImageView()
    let navBarCoverView = UIView()
    let tabBarCoverView = UIView()

    var statusImageView = UIImageView()

    @objc func animateCloseZoomImageView(){
        
        if let startingFrame = statusImageView.superview?.convert(statusImageView.frame, to: nil){
            UIView.animate(withDuration: 0.75, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 0.5, options: .curveEaseOut, animations: {() -> Void in
                self.zoomImageView.frame = startingFrame
                self.blackBackgroundView.alpha = 0
                self.navBarCoverView.alpha = 0
                self.tabBarCoverView.alpha = 0
            }, completion: {(didComplete) -> Void in
                self.zoomImageView.removeFromSuperview()
                self.blackBackgroundView.removeFromSuperview()
                self.navBarCoverView.removeFromSuperview()
                self.tabBarCoverView.removeFromSuperview()
                self.statusImageView.alpha = 1
            })
        }
    }
    
    func animateZoomImageView(oriImageView: UIImageView){
        self.statusImageView = oriImageView
        
        if let startingFrame = oriImageView.superview?.convert(oriImageView.frame, to: nil){
            oriImageView.alpha = 0
            
            // 背景
            blackBackgroundView.frame = self.view.frame
            blackBackgroundView.alpha = 0
            blackBackgroundView.backgroundColor = .black
            view.addSubview(blackBackgroundView)
            
            if let keyWindow = UIApplication.shared.keyWindow{
                // ナビバー
                // 20+40 : ナビバーの高さ
                navBarCoverView.frame = CGRect(x: 0, y: 0, width: self.view.frame.width, height: 20 + 44)
                navBarCoverView.backgroundColor = .black
                navBarCoverView.alpha = 0
                keyWindow.addSubview(navBarCoverView)

                // Tabバー
                // 49 : ナビバーの高さ
                tabBarCoverView.frame = CGRect(x: 0, y: keyWindow.frame.height - 49, width: self.view.frame.width, height: 49)
                tabBarCoverView.backgroundColor = .black
                tabBarCoverView.alpha = 0
                keyWindow.addSubview(tabBarCoverView)

            }
            
            zoomImageView.backgroundColor = UIColor.red
            zoomImageView.frame = startingFrame
            zoomImageView.image = oriImageView.image
            zoomImageView.contentMode = .scaleAspectFill
            zoomImageView.isUserInteractionEnabled = true
            view.addSubview(zoomImageView)
            
            // 閉じるアクションイベントリスナ
            blackBackgroundView.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(animateCloseZoomImageView)))
            zoomImageView.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(animateCloseZoomImageView)))
            
            
            // 開くアニメーション
            // アニメーション調整
            UIView.animate(withDuration: 0.75, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 0.5, options: .curveEaseOut, animations: {() -> Void in
                
                let height = (self.view.frame.width / startingFrame.width) * startingFrame.height
                let y = (self.view.frame.height / 2) - (height / 2)
                self.zoomImageView.frame = CGRect(x: 0, y: y, width: self.view.frame.width, height: height)
                self.blackBackgroundView.alpha = 1
                self.navBarCoverView.alpha = 1
                self.tabBarCoverView.alpha = 1
                
            }, completion: nil)
            
//            // シンプルアニメーション
//            UIView.animate(withDuration: 0.75, animations: {() -> Void in
//                let height = (self.view.frame.width / startingFrame.width) * startingFrame.height
//                let y = (self.view.frame.height / 2) - (height / 2)
//                self.zoomImageView.frame = CGRect(x: 0, y: y, width: self.view.frame.width, height: height)
//                self.blackBackgroundView.alpha = 1
//                self.navBarCoverView.alpha = 1
//                self.tabBarCoverView.alpha = 1
//            })
        }
    }
}

