//
//  ViewController.swift
//  AnimationPractice
//
//  Created by Tomoyuki Tsujimoto on 2019/01/18.
//

import UIKit

class ViewController: UIViewController {
    
//    let bgImageView: UIImageView = {
//        let imageView = UIImageView(image: )
//        return imageView
//    }()
    
    let iconsContainerView: UIView = {
        let containerView = UIView()
        containerView.backgroundColor = .red
        containerView.frame = CGRect(x: 0, y: 0, width: 200, height: 100)
        return containerView
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
//        self.view.didAddSubview(bgImageView)
//        bgImageView.frame = view.frame
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

