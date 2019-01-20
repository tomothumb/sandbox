//
//  CustomTabBarController.swift
//  AnimationPractice
//
//  Created by Tomoyuki Tsujimoto on 2019/01/20.
//

import Foundation
import UIKit

class CustomTabBarController: UITabBarController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let feedController = FeedController(collectionViewLayout: UICollectionViewFlowLayout())
        let navigationController = UINavigationController(rootViewController: feedController)
//        window?.rootViewController = navigationController;
        navigationController.title = "News Feed"
        navigationController.tabBarItem.image = UIImage(named: "heart")

        let friendsController = FriendsController()
        let secondNavigationController = UINavigationController(rootViewController: friendsController)
        secondNavigationController.title = "Friends"
        secondNavigationController.tabBarItem.image = UIImage(named: "thumbs-up")

        
        viewControllers = [
            navigationController,
            secondNavigationController
        ]
    }
}
