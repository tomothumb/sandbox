//
//  FeedCell.swift
//  AnimationPractice
//
//  Created by Tomoyuki Tsujimoto on 2019/01/20.
//

import Foundation
import UIKit

class FeedCell: UICollectionViewCell {
    
    var post: Post? {
        didSet {
            statusImageView.image = nil
            
            if let statusImageUrl = post?.statusImageUrl{
                
                let url: URL = URL(string: statusImageUrl)!
                
                URLSession.shared.dataTask(with: URLRequest(url: url), completionHandler: {(data, response, error) -> Void in
                    
                    if error != nil {
                        print(error!)
                        return
                    }
                    
                    let image = UIImage(data: data!)
                                        
                    DispatchQueue.main.async {
                        self.statusImageView.image = image
                        //                        self.loader.stopAnimation()
                    }
                }).resume()
            
            }
//            if let statusImageName = post?.statusImageName{
//                statusImageView.image = UIImage(named: statusImageName)
//            }
            
            setupNameLocationStatusAndProfileImage()
        }
    }
    
    private func setupNameLocationStatusAndProfileImage() {
        
        //ステータステキスト
        if let statusText = post?.statusText {
            statusTextView.text = statusText
            statusTextView.font = UIFont.systemFont(ofSize: 14)
        }
        
        //プロフィール画像
        if let profileImageName = post?.profileImageName{
            profileImageView.image = UIImage(named: profileImageName)
        }
        
        //名前
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
        
        // いいね数、コメント数
        // 型変換
        let numLikesStr:String = String( post?.numLikes! ?? 0 )
        let numCommentsStr:String = String( post?.numComments! ?? 0 )
        likesCommentsLabel.text = numLikesStr  + " Likes   " + numCommentsStr + " Comments"

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
