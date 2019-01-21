//
//  MiscController.swift
//  AnimationPractice
//
//  Created by Tomoyuki Tsujimoto on 2019/01/21.
//

import Foundation
import UIKit

class MiscController: UIViewController{
    
    let zoomImageView = UIImageView()
    let statingFrame = CGRect(x: 30, y: 100, width: 200, height: 100)
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navigationItem.title = "Other"
        
        // Textbox
        let textView = UITextView()
        textView.frame = CGRect(x: 0, y: 0, width: 200, height: 100)
        textView.backgroundColor = .lightGray
        textView.font = UIFont.preferredFont(forTextStyle: .headline)
        view.addSubview(textView)
        // auto layout
        textView.translatesAutoresizingMaskIntoConstraints = false
        [
            textView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor),
            textView.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
            textView.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor),
            textView.heightAnchor.constraint(equalToConstant: 50)
            ].forEach { (c) in
                c.isActive = true
        }
        textView.delegate = self
        textView.isScrollEnabled = false
        textView.text = "default text default text default text default text default texttext default text default text default texttext default text default text default text"
        textViewDidChange(textView)
        
        // Zoom
        zoomImageView.frame = statingFrame
        zoomImageView.backgroundColor = UIColor.red
        zoomImageView.image = nil
        zoomImageView.contentMode = .scaleAspectFill
        zoomImageView.clipsToBounds = true
        
        zoomImageView.isUserInteractionEnabled = true
        zoomImageView.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(animate) ))
        
        // Image View
        let imageUrl = "https://placeimg.com/640/480/any"
        let url: URL = URL(string: imageUrl)!
        URLSession.shared.dataTask(with: URLRequest(url: url), completionHandler: {(data, response, error) -> Void in
            if error != nil {
                print(error!)
                return
            }
            let image = UIImage(data: data!)
            DispatchQueue.main.async {
                self.zoomImageView.image = image
            }
        }).resume()
        
        view.addSubview(zoomImageView)
        
    }
    
    @objc func animate(){
        UIView.animate(withDuration: 0.75, animations: {() -> Void in
            let height = (self.view.frame.width / self.statingFrame.width) * self.statingFrame.height
            let y = (self.view.frame.height / 2) - (height / 2)
            self.zoomImageView.frame = CGRect(x: 0, y: y, width: self.view.frame.width, height: height)
            self.zoomImageView.backgroundColor = UIColor.blue
        })
    }
    
}


extension MiscController: UITextViewDelegate {
    func textViewDidChange(_ textView: UITextView) {
//        print(textView.text)
        let size = CGSize(width: view.frame.width, height: .infinity)
        let estimatedSize = textView.sizeThatFits(size)
        
        textView.constraints.forEach { (constraint) in
            if constraint.firstAttribute == .height {
                constraint.constant = estimatedSize.height
            }
        }
    }
}


