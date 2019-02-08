//
//  Extensions.swift
//  FirebaseSample
//
//  Created by Tomoyuki Tsujimoto on 2019/02/08.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit

let imageCache = NSCache<AnyObject, AnyObject>()

extension UIImageView {
    
    func loadImageUsingCacheWithUrlString(urlString: String){
        
        self.image = nil
        
        // check cache for image first
        if let cachedImage = imageCache.object(forKey: urlString as AnyObject) as? UIImage {
            self.image = cachedImage
            return
        }
        
        // otherwise fire off a new download
        let url = URL(string: urlString)
        URLSession.shared.dataTask(with: url!, completionHandler: { (data, response, err) in
            if err != nil {
                print(err!)
                return
            }
            
            // success
            DispatchQueue.main.async {
//                print("loaded")
                
                if let downloadedImage = UIImage(data: data!) {
                    imageCache.setObject(downloadedImage, forKey: urlString as AnyObject)
                    self.image = downloadedImage
                }
                
//                    cell.imageView?.image = UIImage(data: data!)
            }
        }).resume()
    }
    
}
