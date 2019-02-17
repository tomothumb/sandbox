//
//  TabBarController.swift
//  VisionApiSample
//
//  Created by Tomoyuki Tsujimoto on 2019/02/17.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit

class TabBarController: UITabBarController {

    override func viewDidLoad() {
        super.viewDidLoad()

        let photoController = ViewController()
        
        let firstNavigationController = UINavigationController(rootViewController: photoController)
        firstNavigationController.title = "Photo"
        
        let cameraViewController = CameraViewController()
        let secondNavigationController = UINavigationController(rootViewController: cameraViewController)
        secondNavigationController.title = "Camera"
        
        let cameraMlViewController = CameraMLViewController()
        let thirdNavigationController = UINavigationController(rootViewController: cameraMlViewController)
        thirdNavigationController.title = "Camera ML"
        
        viewControllers = [
            firstNavigationController,
            secondNavigationController,
            thirdNavigationController
        ]
        
//        tabBar.isTranslucent = false

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
