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

    var cnt: Int = 0
    
    
    let bgImageView: UIImageView = {
        let imageView = UIImageView(image: UIImage(named: "smiling.png"))
        return imageView
    }()

    let iconsContainerView: UIView = {
        let containerView = UIView()
        containerView.backgroundColor = .white

        // configration options
        let iconHeight: CGFloat = 30
        let iconWidth: CGFloat = iconHeight
        let padding: CGFloat = 8

        let images = [
            UIImage(named: "smiling.png"),
            UIImage(named: "disappointed.png"),
            UIImage(named: "heart.png"),
            UIImage(named: "thumbs-up"),
            UIImage(named: "thumbs-down"),
        ]


        let arrangedSubviews = images.map({ (image) -> UIView in
            let imageView = UIImageView(image: image)

            imageView.layer.cornerRadius = iconHeight / 2
            imageView.isUserInteractionEnabled = true

            return imageView
        })

        let stackView = UIStackView(arrangedSubviews: arrangedSubviews)
        stackView.distribution = .fillEqually


        stackView.spacing = padding
        stackView.layoutMargins = UIEdgeInsets(top: padding, left: padding, bottom: padding, right: padding)
        stackView.isLayoutMarginsRelativeArrangement = true

        containerView.addSubview(stackView)

        let numberOfIcons: CGFloat = CGFloat(arrangedSubviews.count);
        containerView.frame = CGRect(x: 0, y: 0,
                width: numberOfIcons * iconWidth + (numberOfIcons + 1) * padding,
                height: iconHeight + 2 * padding)
        containerView.layer.cornerRadius = containerView.frame.height / 2
        // shadow
        containerView.layer.shadowColor = UIColor(white: 0.0, alpha: 0.7).cgColor
        containerView.layer.shadowRadius = 8
        containerView.layer.shadowOpacity = 0.5
        containerView.layer.shadowOffset = CGSize(width: 0, height: 4)

        stackView.frame = containerView.frame
        return containerView
    }()
    
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

        // 画面の横幅を取得
        let screenWidth: CGFloat = view.frame.size.width
        let screenHeight: CGFloat = view.frame.size.height
        // 画像の中心を画面の中心に設定
        bgImageView.center = CGPoint(x: screenWidth / 2, y: screenHeight / 2)
        self.view.addSubview(bgImageView)


        setupLongPressGesture()
    }

    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        
        return posts.numberOfPosts()
    }

    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let feedCell = collectionView.dequeueReusableCell(withReuseIdentifier: cellId, for: indexPath) as! FeedCell
        
        feedCell.post = posts.members()[indexPath.item] as! Post
        
//        if let name = posts[indexPath.item].name {
//            feedCell.nameLabel.text = name
//        }
        
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

    fileprivate func setupLongPressGesture() {
        view.addGestureRecognizer(UILongPressGestureRecognizer(target: self, action: #selector(handleLongPress)))
    }

    @objc func handleLongPress(gesture: UILongPressGestureRecognizer) {
        print("Long Pressed:", Date())

        self.cnt = self.cnt + 1
        navigationItem.title = String(self.cnt)

        if gesture.state == .began {
            print("began")
            self.handleGestureBegan(gesture: gesture)
        } else if gesture.state == .ended {
            print("ended")
            // clean up the animation
            UIView.animate(withDuration: 0.5, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut,
                    animations: {
                        let stackView = self.iconsContainerView.subviews.first
                        stackView?.subviews.forEach({ (imageView) in
                            imageView.transform = .identity
                        })
                        self.iconsContainerView.transform = self.iconsContainerView.transform.translatedBy(x: 0, y: 50)
                        self.iconsContainerView.alpha = 0

                    }, completion: { (_) in
                self.iconsContainerView.removeFromSuperview()
            })
        } else if gesture.state == .changed {
            self.handleGestureChanged(gesture: gesture)
        }
    }

    fileprivate func handleGestureChanged(gesture: UILongPressGestureRecognizer) {
        let pressedLocation = gesture.location(in: self.iconsContainerView)
        print(pressedLocation)

        let hitTestView = iconsContainerView.hitTest(pressedLocation, with: nil)

        if hitTestView is UIImageView {
//            hitTestView?.alpha = 0
            UIView.animate(withDuration: 0.5, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut,
                    animations: {
                        let stackView = self.iconsContainerView.subviews.first
                        stackView?.subviews.forEach({ (imageView) in
                            imageView.transform = .identity
                        })
                        hitTestView?.transform = CGAffineTransform(translationX: 0, y: -50)
                    })
        }


    }

    // 初期化
    fileprivate func handleGestureBegan(gesture: UILongPressGestureRecognizer) {
        view.addSubview(iconsContainerView)

        let pressedLocation = gesture.location(in: self.view)
        print(pressedLocation)

        // init transformation
        let centerX = (view.frame.width - iconsContainerView.frame.width) / 2
        self.iconsContainerView.transform = CGAffineTransform(translationX: centerX, y: pressedLocation.y)
        // alpha
        iconsContainerView.alpha = 0

        // Animation
        UIView.animate(withDuration: 0.5, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            self.iconsContainerView.alpha = 1
            self.iconsContainerView.transform = CGAffineTransform(translationX: centerX, y: pressedLocation.y - (self.iconsContainerView.frame.height / 2))
        })
    }

    // Status bar を消す
//    override var prefersStatusBarHidden: Bool { return true }

//    override var preferredStatusBarStyle: UIStatusBarStyle = .lightContent

}

