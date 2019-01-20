//
//  ViewController.swift
//  AnimationPractice
//
//  Created by Tomoyuki Tsujimoto on 2019/01/18.
//

import UIKit

class Post {
    var name: String?
    var statusText: String?
    var statusImageName: String?
    var profileImageName: String?
    var numLikes: Int?
    var numComments: Int?
}

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
    
    var posts = [Post]()

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let postMark = Post()
        postMark.name = "Mark"
        postMark.statusText = "I am Mark"
        postMark.profileImageName = "smiling"
        postMark.statusImageName = "smiling"
        postMark.numLikes = 100
        postMark.numComments = 100
        
        
        let postSteave = Post()
        postSteave.name = "Steave"
        postSteave.statusText = "abcdefg ABCDEFG abcdefg ABCDEFG abcdefg ABCDEFG abcdefg ABCDEFG abcdefg ABCDEFG abcdefg ABCDEFG abcdefg ABCDEFG abcdefg \n\n ABCDEFG "
        postSteave.profileImageName = "heart"
        postSteave.statusImageName = "smiling"
        postSteave.numLikes = 120
        postSteave.numComments = 130

        
        let postGandhi = Post()
        postGandhi.name = "Gandhi"
        postGandhi.statusText = "blah blah blah blah blah blah blah blah blah blah blah blah blah"
        postGandhi.profileImageName = "thumbs-up"
        postGandhi.statusImageName = "smiling"
        postGandhi.numLikes = 10
        postGandhi.numComments = 30

        
        posts.append(postMark)
        posts.append(postSteave)
        posts.append(postGandhi)


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
        
        return posts.count
    }

    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let feedCell = collectionView.dequeueReusableCell(withReuseIdentifier: cellId, for: indexPath) as! FeedCell
        
        feedCell.post = posts[indexPath.item]
        
//        if let name = posts[indexPath.item].name {
//            feedCell.nameLabel.text = name
//        }
        
        return feedCell
//        return collectionView.dequeueReusableCell(withReuseIdentifier: cellId, for: indexPath)
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        
        if let statusText = posts[indexPath.item].statusText {
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


let cellId = "cellId"

class FeedCell: UICollectionViewCell {
    
    var post: Post? {
        didSet {
            
            if let statusText = post?.statusText {
                statusTextView.text = statusText
                statusTextView.font = UIFont.systemFont(ofSize: 14)
            }
            
            if let statusImageName = post?.statusImageName{
                statusImageView.image = UIImage(named: statusImageName)
            }

            if let profileImageName = post?.profileImageName{
                profileImageView.image = UIImage(named: profileImageName)
            }
            
            
            if let name = post?.name {
                // テキスト
                let attributedText = NSMutableAttributedString(string: name, attributes: [NSAttributedString.Key.font: UIFont.boldSystemFont(ofSize: 12)])
                
                // テキスト追加
                attributedText.append(NSAttributedString(
                    string: "\n- December 111 - abc",
                    attributes: [NSAttributedString.Key.foregroundColor: UIColor(red: 0.5, green: 0.5, blue: 0.5, alpha: 1),
                                 NSAttributedString.Key.backgroundColor: UIColor(red: 1, green: 0.5, blue: 0.5, alpha: 1),
                                 NSAttributedString.Key.font: UIFont.systemFont(ofSize: 10)
                    ]
                ))
                
                let paragraphStyle = NSMutableParagraphStyle()
                paragraphStyle.lineSpacing = 4
                attributedText.addAttribute(NSAttributedString.Key.paragraphStyle, value: paragraphStyle, range: NSMakeRange(0, attributedText.string.count))
                
                // 画像
                let attachmentImg = NSTextAttachment()
                attachmentImg.image = UIImage(named: "smiling")
                attachmentImg.bounds = CGRect(x: 0, y: -4, width: 16, height: 16)
                attributedText.append(NSAttributedString(attachment: attachmentImg))

                nameLabel.attributedText = attributedText
            }
            
            // 型変換
            let numLikesStr:String = String( post?.numLikes! ?? 0 )
            let numCommentsStr:String = String( post?.numComments! ?? 0 )
            likesCommentsLabel.text = numLikesStr  + " Likes   " + numCommentsStr + " Comments"
        }
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)

        setupViews()
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    let nameLabel: UILabel = {
        let label = UILabel()
        label.numberOfLines = 2
        return label
    }()

    let profileImageView: UIImageView = {
        let imageView = UIImageView()
        imageView.image = UIImage(named: "face")
        // 引き延ばす
//        imageView.contentMode = .scaleToFill
        // 全て含める
//        imageView.contentMode = .scaleAspectFit
        // いっぱい
        imageView.contentMode = .scaleAspectFill
        // はみ出た分をトリミング
        imageView.clipsToBounds = true
        imageView.backgroundColor = UIColor.rgb(red: 200, green: 200, blue: 200)
        imageView.translatesAutoresizingMaskIntoConstraints = false
        imageView.layer.cornerRadius = imageView.frame.height / 2

        return imageView
    }()

    let statusTextView: UITextView = {
        let textView = UITextView()
        textView.isScrollEnabled = false
        return textView
    }()

    let statusImageView: UIImageView = {
        let imageView = UIImageView()
        imageView.image = UIImage(named: "face")
        // 塗りつぶし
        imageView.contentMode = .scaleAspectFill
        // トリミング
        imageView.layer.masksToBounds = true
        return imageView
    }()

    let likesCommentsLabel: UILabel = {
        let label = UILabel()
        label.text = "400 Likes   10.7k Comments"
        label.font = UIFont.systemFont(ofSize: 12)
        label.textColor = UIColor.rgb(red: 150, green: 150, blue: 150)
        return label
    }()
    
    let dividerLineView: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor.rgb(red: 200, green: 200, blue: 200)
        return view
    }()
    
    let likeButton = buttonForTitle(title: "like", imageName: "thumbs-up")
    let commentButton = buttonForTitle(title: "hate", imageName: "thumbs-down")
    let heartButton = buttonForTitle(title: "heart", imageName: "heart")

    static func buttonForTitle(title: String, imageName: String) -> UIButton {
        let button = UIButton()
        button.setTitle(title, for: UIControl.State.normal)
        button.setTitleColor(UIColor.rgb(red: 150, green: 150, blue: 255), for: UIControl.State.normal)
        button.setImage(UIImage(named: imageName), for: UIControl.State.normal)
        
        button.titleEdgeInsets = UIEdgeInsets(top: 0, left: 8, bottom: 0, right: 0)
        button.titleLabel?.font = UIFont.boldSystemFont(ofSize: 14)
        return button
    }

    func setupViews() {
        backgroundColor = UIColor.white

        addSubview(nameLabel)
        addSubview(profileImageView)
        addSubview(statusTextView)
        addSubview(statusImageView)
        addSubview(likesCommentsLabel)
        addSubview(dividerLineView)
        addSubview(likeButton)
        addSubview(commentButton)
        addSubview(heartButton)
        

        addConstraintsWithFormat(format: "H:|-8-[v0(44)]-8-[v1]|", views: profileImageView, nameLabel)
        addConstraintsWithFormat(format: "H:|-4-[v0]-4-|", views: statusTextView)
        addConstraintsWithFormat(format: "H:|[v0]|", views: statusImageView)
        addConstraintsWithFormat(format: "H:|-12-[v0]|", views: likesCommentsLabel)
        addConstraintsWithFormat(format: "H:|-12-[v0]-12-|", views: dividerLineView)
        
        // button constraints
        addConstraintsWithFormat(format: "H:|[v0(v2)][v1(v2)][v2]|", views: likeButton,commentButton,heartButton)
        
        addConstraintsWithFormat(format: "V:|-12-[v0]", views: nameLabel)
        addConstraintsWithFormat(format: "V:|-8-[v0(44)]-4-[v1]-4-[v2(150)]-8-[v3(24)]-8-[v4(0.5)]-8-[v5(30)]|", views: profileImageView, statusTextView, statusImageView, likesCommentsLabel,dividerLineView,likeButton)
        addConstraintsWithFormat(format: "V:[v0(30)]|", views:commentButton)
        addConstraintsWithFormat(format: "V:[v0(30)]|", views:heartButton)

    }
}

extension UIColor {
    static func rgb(red:CGFloat, green:CGFloat, blue:CGFloat) -> UIColor {
        return UIColor(red: red/255, green: green/255, blue: blue/255, alpha:1)
    }
}

extension UIView {
    func addConstraintsWithFormat(format: String, views: UIView...) {
        var viewsDictionary = [String: UIView]()
        for (index, view) in views.enumerated() {
            let key = "v\(index)"
            viewsDictionary[key] = view
            view.translatesAutoresizingMaskIntoConstraints = false
        }

        addConstraints(NSLayoutConstraint.constraints(withVisualFormat: format, options: NSLayoutConstraint.FormatOptions(), metrics: nil, views: viewsDictionary))
    }
}
