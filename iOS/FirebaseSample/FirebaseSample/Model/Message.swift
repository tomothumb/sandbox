//
//  Message.swift
//  FirebaseSample
//
//  Created by Tomoyuki Tsujimoto on 2019/02/10.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit

class Message: NSObject {
    
    var fromId: String?
    var text: String?
    var timestamp: NSNumber?
    var toId: String?

    init(dictionary: [String: Any]) {
        self.fromId = dictionary["fromId"] as? String
        self.text = dictionary["text"] as? String
        self.timestamp = dictionary["timestamp"] as? NSNumber
        self.toId = dictionary["toId"] as? String
    }
}
