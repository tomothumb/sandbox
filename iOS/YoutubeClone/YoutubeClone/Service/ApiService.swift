//
//  ApiService.swift
//  YoutubeClone
//
//  Created by Tomoyuki Tsujimoto on 2019/01/27.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit

class ApiService: NSObject {
    static let sharedInstance = ApiService()
    
    // Youtubeの再生リストのJSON リクエスト
    func fetchVideos(completion: @escaping ([Video]) -> ()) {
        guard let url = URL(string: "https://s3-us-west-2.amazonaws.com/youtubeassets/home.json") else { return }
        
        URLSession.shared.dataTask(with: url) { (data, res, err) in
            
            if err != nil {
                print(err!)
                return
            }
            
            let str = NSString(data: data!, encoding: String.Encoding.utf8.rawValue)
            print("success")
            print(str!)
            
            do {
                let json = try JSONSerialization.jsonObject(with: data!, options: JSONSerialization.ReadingOptions.mutableContainers)
                var videos = [Video]()
                
                // jsonをパースし、videoオブジェクトに追加する。
                for dictionary in json as! [[String: AnyObject]] {
                    let video = Video()
                    video.title = dictionary["title"] as? String
                    // サムネのURLをセット
                    video.thumbnailImageName = dictionary["thumbnail_image_name"] as? String
                    //channelをセット
                    let channelDictionary = dictionary["channel"] as! [String: AnyObject]
                    let channel = Channel()
                    channel.name = channelDictionary["name"] as? String
                    channel.profileImageName = channelDictionary["profile_image_name"] as? String
                    
                    video.channel = channel
                    videos.append(video)
                }
                
                //Json読み込み後にViewをリロード
                DispatchQueue.main.async {
                    completion(videos)
//                    self.collectionView?.reloadData()
                }
                
                
            } catch let jsonErr {
                print("Error serializing json:", jsonErr)
            }
            
            }.resume()
    }
}
