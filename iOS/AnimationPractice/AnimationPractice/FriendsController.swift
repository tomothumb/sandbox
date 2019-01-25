//
//  FriendsController.swift
//  AnimationPractice
//
//  Created by Tomoyuki Tsujimoto on 2019/01/20.
//

import Foundation
import UIKit

class FriendsController: UIViewController, URLSessionDownloadDelegate{

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
    
    var pulsatingLayer: CAShapeLayer!
    var shapeLayer: CAShapeLayer!
    
    let percentageLabel: UILabel = {
        let label = UILabel()
        label.text = "Start"
        label.textAlignment = .center
        label.font = UIFont.boldSystemFont(ofSize: 32)
        return label
    }()
    
    override var preferredStatusBarStyle: UIStatusBarStyle{
        return .lightContent
    }
    
    // 閉じて開き直した後にアニメーションを再開させる
    private func setupNotificationObservers(){
        NotificationCenter.default.addObserver(self, selector: #selector(handleEnterForeground),
                                               name: UIApplication.willEnterForegroundNotification, object:nil)
    }
    
    @objc private func handleEnterForeground(){
        animatePulsatingLayer()
    }
    
    private func createCircleShapeLayer( strokeColor: UIColor, fillColor: UIColor) -> CAShapeLayer {
        let circularPath = UIBezierPath(arcCenter: .zero, radius: 80, startAngle: 0, endAngle: 2 * CGFloat.pi, clockwise: true)

        let layer = CAShapeLayer()
        layer.path =  circularPath.cgPath
        layer.strokeColor = strokeColor.cgColor
        layer.lineWidth = 15
        layer.lineCap = .round
        layer.fillColor = fillColor.cgColor
        layer.position = view.center
//        layer.strokeEnd = 1
        return layer
    }
    
    private func setupCircleLayer(){
        pulsatingLayer = createCircleShapeLayer(strokeColor: .clear, fillColor: .yellow)
        view.layer.addSublayer(pulsatingLayer)
        animatePulsatingLayer()
        
        let trackLayer = createCircleShapeLayer(strokeColor: .gray, fillColor: .clear)
//        trackLayer.strokeEnd = 1
        view.layer.addSublayer(trackLayer)
        
        shapeLayer = createCircleShapeLayer(strokeColor: .red, fillColor: .clear)
        shapeLayer.lineWidth = 10
        shapeLayer.strokeEnd = 0
        shapeLayer.transform = CATransform3DMakeRotation( -CGFloat.pi / 2, 0, 0, 1)
        view.layer.addSublayer(shapeLayer)
    }
    
    private func setupPercentageLabel(){
        view.addSubview(percentageLabel)
        percentageLabel.frame = CGRect(x: 0, y: 0, width: 100, height: 100)
        percentageLabel.center = view.center
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        navigationItem.title = "Friend"
        view.backgroundColor = .black
        
        setupNotificationObservers()
        
        // 画面の横幅を取得
        let screenWidth: CGFloat = view.frame.size.width
        let screenHeight: CGFloat = view.frame.size.height

        // 画像の中心を画面の中心に設定
        bgImageView.center = CGPoint(x: screenWidth / 2, y: screenHeight / 4)
        self.view.addSubview(bgImageView)
        setupLongPressGesture()
        
        // サークル
        setupCircleLayer()

        view.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(handleTap)))

        // パーセンテージ
        setupPercentageLabel()

    }
    
    
    private func animatePulsatingLayer(){
        let myanimation = CABasicAnimation(keyPath: "transform.scale")
        myanimation.toValue = 1.2
        myanimation.duration = 2
        myanimation.autoreverses = true
        myanimation.repeatCount = Float.infinity
        myanimation.timingFunction = CAMediaTimingFunction(name: CAMediaTimingFunctionName.easeOut)
        // カスタマイズ
        // http://cubic-bezier.com/#.17,.67,.83,.67
//        myanimation.timingFunction = CAMediaTimingFunction(controlPoints: 0.55, 0, 0.59, 0.13)
        pulsatingLayer.add(myanimation, forKey: "pulsing")
    }
    
    func urlSession(_ session: URLSession, downloadTask: URLSessionDownloadTask, didWriteData bytesWritten: Int64, totalBytesWritten: Int64, totalBytesExpectedToWrite: Int64) {
        let percentage = CGFloat(totalBytesWritten) / CGFloat(totalBytesExpectedToWrite)
        DispatchQueue.main.async {
            self.percentageLabel.text = "\(Int(percentage * 100))%"
            self.shapeLayer.strokeEnd = percentage
        }
        print(percentage, totalBytesWritten,totalBytesExpectedToWrite)
    }
    
    func urlSession(_ session: URLSession, downloadTask: URLSessionDownloadTask, didFinishDownloadingTo location: URL) {
        print("Finished downloading file")
    }

    let downloadVideoUrlString = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    
    private func beginDownloadingFIle(){
        print("Attempting to donwload file")
        shapeLayer.strokeEnd = 0

        let configuration = URLSessionConfiguration.default
        let operationQueue = OperationQueue()
        let urlSession = URLSession(configuration: configuration, delegate: self, delegateQueue: operationQueue)

        guard let url = URL(string: downloadVideoUrlString) else {return}
        let downloadTask = urlSession.downloadTask(with: url)
        downloadTask.resume()
    }

    fileprivate func animateCircle() {
        let basicAnimation = CABasicAnimation(keyPath: "strokeEnd")
        
        basicAnimation.toValue = 1
        basicAnimation.duration = 3
        basicAnimation.fillMode = .forwards
        basicAnimation.isRemovedOnCompletion = false
        shapeLayer.add(basicAnimation,forKey: "urSoBasic")
    }
    
    @objc private func handleTap(){
        print("attempting to animate stroke")
        
        beginDownloadingFIle()
        
//        animateCircle()
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
    
}
