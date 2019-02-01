//
//  TrendingCell.swift
//  YoutubeClone
//
//  Created by Tomoyuki Tsujimoto on 2019/02/02.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit

class TrendingCell: FeedCell{
    override func fetchVideos() {
        
        ApiService.sharedInstance.fetchTrandingFeed { (videos) in
            self.videos = videos
            self.collectionView.reloadData()
        }
    }
    
}

