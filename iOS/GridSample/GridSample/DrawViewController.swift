//
//  DrawViewController.swift
//  GridSample
//
//  Created by Tomoyuki Tsujimoto on 2019/02/20.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit

class DrawViewController: UIViewController {

    let canvas = Canvas()
    override func viewDidLoad() {
        super.viewDidLoad()

        view.addSubview(canvas)
        canvas.backgroundColor = .white
        canvas.frame = view.frame
    }
    

}
