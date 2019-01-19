//
//  ViewController.swift
//  AnimationPractice
//
//  Created by Tomoyuki Tsujimoto on 2019/01/18.
//

import UIKit


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
                                     width: numberOfIcons * iconWidth + (numberOfIcons+1) * padding,
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
        
        navigationItem.title = "Feed"
        
        collectionView?.alwaysBounceVertical = true
        collectionView?.backgroundColor = UIColor(white: 0.90, alpha: 1)
        
        collectionView?.register(FeedCell.self, forCellWithReuseIdentifier: cellId)

        // 画面の横幅を取得
        let screenWidth:CGFloat = view.frame.size.width
        let screenHeight:CGFloat = view.frame.size.height
        // 画像の中心を画面の中心に設定
        bgImageView.center = CGPoint(x:screenWidth/2, y:screenHeight/2)
        self.view.addSubview(bgImageView)

        
        setupLongPressGesture()
    }
    
    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 3
    }
    
    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        return collectionView.dequeueReusableCell(withReuseIdentifier: cellId, for: indexPath)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        
        return CGSize(width: view.frame.width, height: 60)
    }
    
    fileprivate func setupLongPressGesture(){
        view.addGestureRecognizer(UILongPressGestureRecognizer(target: self, action: #selector(handleLongPress)))
    }
    
    @objc func handleLongPress(gesture: UILongPressGestureRecognizer){
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
                
            },completion: { (_) in
                self.iconsContainerView.removeFromSuperview()
            })
        } else if gesture.state == .changed {
            self.handleGestureChanged(gesture: gesture)
        }
    }

    fileprivate func handleGestureChanged(gesture: UILongPressGestureRecognizer){
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
    fileprivate func handleGestureBegan(gesture: UILongPressGestureRecognizer){
        view.addSubview(iconsContainerView)
        
        let pressedLocation = gesture.location(in: self.view)
        print(pressedLocation)
        
        // init transformation
        let centerX = (view.frame.width - iconsContainerView.frame.width) / 2
        self.iconsContainerView.transform = CGAffineTransform(translationX: centerX, y: pressedLocation.y )
        // alpha
        iconsContainerView.alpha = 0
        
        // Animation
        UIView.animate(withDuration: 0.5, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            self.iconsContainerView.alpha = 1
            self.iconsContainerView.transform = CGAffineTransform(translationX: centerX, y: pressedLocation.y - (self.iconsContainerView.frame.height/2) )
        })
    }

    // Status bar を消す
//    override var prefersStatusBarHidden: Bool { return true }

//    override var preferredStatusBarStyle: UIStatusBarStyle = .lightContent

}


let cellId = "cellId"

class FeedCell: UICollectionViewCell{
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        setupViews()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    let nameLabel: UILabel = {
        let label = UILabel()
        label.text = "Sample"
        label.font = UIFont.boldSystemFont(ofSize: 14)
        // このViewだけAutoLayoutを適応する（False:AutoLayoutを解除）
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let profileImageView: UIImageView = {
        let imageView = UIImageView()
        imageView.contentMode = .scaleAspectFit
        imageView.backgroundColor = UIColor.red
        imageView.translatesAutoresizingMaskIntoConstraints = false
        //        label.text = "Sample"
        //        label.font = UIFont.boldSystemFont(ofSize: 14)
        //        // このViewだけAutoLayoutを適応する（False:AutoLayoutを解除）
        //        label.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
    
    func setupViews(){
        backgroundColor = UIColor.white
        
        addSubview(nameLabel)
        addSubview(profileImageView)
        
        addConstraintsWithFormat(format: "H:|-8-[v0(44)]-8-[v1]|", views: profileImageView, nameLabel)
        addConstraintsWithFormat(format: "V:|[v0]|", views: nameLabel)
        addConstraintsWithFormat(format: "V:|-8-[v0(44)]", views: profileImageView)

        
//        addConstraints(NSLayoutConstraint.constraints(
//            withVisualFormat: "H:|-8-[v0(44)]-8-[v1]|",
//            options: NSLayoutConstraint.FormatOptions(),
//            metrics: nil,
//            views: ["v0" : profileImageView, "v1" : nameLabel]
//        ))
        
//        addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "V:|[v0]|", options: NSLayoutConstraint.FormatOptions(), metrics: nil, views: ["v0" : nameLabel]))
//        addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "V:|-8-[v0(44)]", options: NSLayoutConstraint.FormatOptions(), metrics: nil, views: ["v0" : profileImageView]))
        
    }
}

extension UIView {
    func addConstraintsWithFormat(format: String, views: UIView...){
        var viewsDictionary = [String: UIView]()
        for(index, view) in views.enumerated() {
            let key = "v\(index)"
            viewsDictionary[key] = view
            view.translatesAutoresizingMaskIntoConstraints = false
        }
        
        addConstraints(NSLayoutConstraint.constraints(withVisualFormat: format, options: NSLayoutConstraint.FormatOptions(), metrics: nil, views: viewsDictionary))
    }
}
