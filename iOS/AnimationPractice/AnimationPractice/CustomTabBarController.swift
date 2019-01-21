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

        let chatController = ChatController()
        let thirdNavigationController = UINavigationController(rootViewController: chatController)
        thirdNavigationController.title = "Chat"
        thirdNavigationController.tabBarItem.image = UIImage(named: "thumbs-down")

        let jsonController = JsonController()
        let forthNavigationController = UINavigationController(rootViewController: jsonController)
        forthNavigationController.title = "Json"
        forthNavigationController.tabBarItem.image = UIImage(named: "smiling")
        
        let miscController = MiscController()
        let fifthNavigationController = UINavigationController(rootViewController: miscController)
        fifthNavigationController.title = "Other"
        fifthNavigationController.tabBarItem.image = UIImage(named: "disappointed")

        viewControllers = [
            secondNavigationController,
            forthNavigationController,
            navigationController,
            thirdNavigationController,
            fifthNavigationController,
        ]
        
        tabBar.isTranslucent = false
        
    }
}
