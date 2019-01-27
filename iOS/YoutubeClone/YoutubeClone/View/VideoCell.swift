//
//  VideoCell.swift
//  YoutubeClone
//
//  Created by Tomoyuki Tsujimoto on 2019/01/26.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit

class BaseCell: UICollectionViewCell{
    override init(frame: CGRect){
        super.init(frame:frame)
        setupViews()
    }
    func setupViews(){}

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

class VideoCell: BaseCell {
    
    var video: Video? {
        
        // データがセットされた時に実行
        didSet {
            print("set video")
            titleLabel.text = video?.title
            
            //サムネのセット
            setupThumbnailImage()
            setupProfileImage()
            
//            thumbnailImageView.image = UIImage(named: (video?.thumbnailImageName)!)
            
//            if let profileImageName = video?.channel?.profileImageName{
//                userProfileImageView.image = UIImage(named: profileImageName)
//            }
            
            let numberFormatter = NumberFormatter()
            numberFormatter.numberStyle = .decimal
            if let channelName = video?.channel?.name, let numberOfViews = video?.numberOfViews {
                if let numberOfViewsString = numberFormatter.string(from: numberOfViews){
                    let subtitleText = "\(channelName) * \(numberOfViewsString) Views * 2 years ago"
                    subtitleTextView.text = subtitleText
                }
            }
            
            // titleLabelの行数によって、高さが変わるので、Viewの高さを計算し、autoLayoutの高さを変更する
            if let title = video?.title {
                let size = CGSize(width: frame.width - 16 - 44 - 8 - 16, height: 1000)
                let options = NSStringDrawingOptions.usesFontLeading.union(.usesLineFragmentOrigin)
                let estimatedRect = NSString(string: title).boundingRect(with: size, options: options, attributes: [.font : UIFont.systemFont(ofSize: 14)], context: nil)
                
                if estimatedRect.size.height > 20 {
                    titleLabelHeightConstraint?.constant = 44
                }else{
                    titleLabelHeightConstraint?.constant = 20
                }
            }
        }
    }
    
    // JSON読み込み後、動画サムネを読み込み表示する
    private func setupThumbnailImage(){
        if let thumbnailImageUrl = video?.thumbnailImageName {
            print("thumbnailImageUrl",thumbnailImageUrl)
            self.thumbnailImageView.loadImageUsingUrlString(urlString: thumbnailImageUrl)
        }
    }
    // JSON読み込み後、プロフィール画像を読み込み表示する
    private func setupProfileImage(){
        if let profileImageUrl = video?.channel?.profileImageName {
            print("profileImageUrl",profileImageUrl)
            self.userProfileImageView.loadImageUsingUrlString(urlString: profileImageUrl)
        }
    }
    
    let thumbnailImageView: CustomImageView = {
        let imageView = CustomImageView()
        imageView.backgroundColor = UIColor(white: 0.9, alpha: 1)
        imageView.image = UIImage(named: "")
        imageView.contentMode = .scaleAspectFill
        imageView.clipsToBounds = true
        return imageView
    }()
    
    let userProfileImageView: CustomImageView = {
        let imageView = CustomImageView()
        imageView.backgroundColor = UIColor(white: 0.9, alpha: 1)
        imageView.image = UIImage(named: "")
        imageView.contentMode = .scaleAspectFill
//        imageView.clipsToBounds = true
        imageView.layer.masksToBounds = true
        imageView.layer.cornerRadius = 22
        return imageView
    }()
    
    let titleLabel: UILabel = {
        let label = UILabel()
        label.text = "Sample Title"
        label.numberOfLines = 0
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    let subtitleTextView: UITextView = {
        let textView = UITextView()
        textView.text = "Sample Subtitle 1,111,222,333 views / 2 years ago"
        textView.translatesAutoresizingMaskIntoConstraints = false
        
        textView.textContainerInset = UIEdgeInsets(top: 0, left: -4, bottom: 0, right: 0)
        textView.textColor = .lightGray
        return textView
    }()
    
    let separatorView: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor(red: 230/255, green: 230/255, blue: 230/255, alpha: 1)
        return view
    }()
    
    var titleLabelHeightConstraint: NSLayoutConstraint?
    
    
    override func setupViews(){
//        backgroundColor = .green
        addSubview(thumbnailImageView)
        thumbnailImageView.frame = CGRect(x: 0, y: 0, width: 100, height: 100)
        
        addSubview(separatorView)
        addSubview(userProfileImageView)
        addSubview(titleLabel)
        addSubview(subtitleTextView)
        
        addConstraintsWithFormat(format: "H:|-16-[v0]-16-|", views: thumbnailImageView)
        addConstraintsWithFormat(format: "H:|-16-[v0(44)]", views: userProfileImageView)
        // Vertical
        addConstraintsWithFormat(format: "V:|-16-[v0]-8-[v1(44)]-36-[v2(1)]|", views: thumbnailImageView, userProfileImageView,separatorView)
        addConstraintsWithFormat(format: "H:|[v0]|", views:  separatorView)
        
        //        addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-16-[v0]-16-|", options: NSLayoutConstraint.FormatOptions(), metrics: nil
        //            , views: ["v0" : thumbnailImageView]))
        //        addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "V:|-16-[v0]-16-[v1(1)]|", options: NSLayoutConstraint.FormatOptions(), metrics: nil
        //            , views: ["v0" : thumbnailImageView,
        //                      "v1" : separatorView]))
        //        addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|[v0]|", options: NSLayoutConstraint.FormatOptions(), metrics: nil
        //            , views: ["v0" : separatorView]))
        
        // Title
        addConstraint(NSLayoutConstraint(item: titleLabel, attribute: .top, relatedBy: .equal, toItem: thumbnailImageView, attribute: .bottom, multiplier: 1, constant: 8))
        addConstraint(NSLayoutConstraint(item: titleLabel, attribute: .left, relatedBy: .equal, toItem: userProfileImageView, attribute: .right, multiplier: 1, constant: 8))
        addConstraint(NSLayoutConstraint(item: titleLabel, attribute: .right, relatedBy: .equal, toItem: thumbnailImageView, attribute: .right, multiplier: 1, constant: 0))
        titleLabelHeightConstraint = NSLayoutConstraint(item: titleLabel, attribute: .height, relatedBy: .equal, toItem: self, attribute: .height, multiplier: 0, constant: 44)
        addConstraint(titleLabelHeightConstraint!)
        
        // Subtitle
        addConstraint(NSLayoutConstraint(item: subtitleTextView, attribute: .top, relatedBy: .equal, toItem: titleLabel, attribute: .bottom, multiplier: 1, constant: 8))
        addConstraint(NSLayoutConstraint(item: subtitleTextView, attribute: .left, relatedBy: .equal, toItem: userProfileImageView, attribute: .right, multiplier: 1, constant: 8))
        addConstraint(NSLayoutConstraint(item: subtitleTextView, attribute: .right, relatedBy: .equal, toItem: thumbnailImageView, attribute: .right, multiplier: 1, constant: 0))
        addConstraint(NSLayoutConstraint(item: subtitleTextView, attribute: .height, relatedBy: .equal, toItem: self, attribute: .height, multiplier: 0, constant: 30))
    }
}

