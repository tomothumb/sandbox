//
//  TabBarViewController.swift
//  GridSample
//
//  Created by Tomoyuki Tsujimoto on 2019/02/20.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit

class TabBarController: UITabBarController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let gridViewController = ViewController()
        let gridNavigationController = UINavigationController(rootViewController: gridViewController)
        gridNavigationController.title = "Grid"
        let drawViewController = DrawViewController()
        let drawNavigationController = UINavigationController(rootViewController: drawViewController)
        drawNavigationController.title = "Draw"

        viewControllers = [
            gridNavigationController,
            drawNavigationController
        ]
        
        // Do any additional setup after loading the view.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
