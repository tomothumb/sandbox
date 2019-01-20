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
        
        feedCell.post = posts.members()[indexPath.item] as! Post
        
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

}

