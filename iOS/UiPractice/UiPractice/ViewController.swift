//
//  ViewController.swift
//  UiPractice
//
//  Created by Tomoyuki Tsujimoto on 2019/01/17.
//  Copyright © 2019年 Socialis. All rights reserved.
//

import UIKit

extension UIColor {
    static let normalText = UIColor(red: 0.2, green: 0.2, blue: 0.2, alpha: 1)
}

extension UIFont {
    static let normalText = UIFont.systemFont(ofSize: 14)
}

class ViewController: UIViewController {

    let label = UILabel()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        view.backgroundColor = UIColor.gray
        label.text = "Hello World"
        label.textAlignment = .center
        label.textColor = UIColor.normalText
        label.font = UIFont.normalText
        view.addSubview(label)
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        label.frame = view.bounds
    }


}

