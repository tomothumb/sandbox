//
//  ViewController.swift
//  AnimationPractice
//
//  Created by Tomoyuki Tsujimoto on 2019/01/18.
//

import UIKit

class ViewController: UIViewController {
    
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
//            imageView.layer.co
//            v.backgroundColor = color
            imageView.layer.cornerRadius = iconHeight / 2
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

        // 画面の横幅を取得
        let screenWidth:CGFloat = view.frame.size.width
        let screenHeight:CGFloat = view.frame.size.height
        // 画像の中心を画面の中心に設定
        bgImageView.center = CGPoint(x:screenWidth/2, y:screenHeight/2)
        self.view.addSubview(bgImageView)

        
        setupLongPressGesture()
    }
    
    fileprivate func setupLongPressGesture(){
        view.addGestureRecognizer(UILongPressGestureRecognizer(target: self, action: #selector(handleLongPress)))
    }
    
    @objc func handleLongPress(gesture: UILongPressGestureRecognizer){
        print("Long Pressed:", Date())
        
        if gesture.state == .began {
            print("began")
            self.handleGestureBegan(gesture: gesture)
        } else if gesture.state == .ended {
            print("ended")
            iconsContainerView.removeFromSuperview()
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
    override var prefersStatusBarHidden: Bool { return true }


}

