//
//  RadioStation.swift
//  DemoApp
//
//  Created by Tomoyuki Tsujimoto on 2018/06/17.
//  Copyright © 2018年 Socialis. All rights reserved.
//

import UIKit

class RadioStation: NSObject {
    
    var name: String
    var frequency: Double
    
    override init(){
        name = "Default"
        frequency = 100
    }
    
    static var minAMFrequency: Double = 520.0
    static var maxAMFrequency: Double = 1610.0
    static var minFMFrequency: Double = 88.3
    static var maxFMFrequency: Double = 107.9
    
    func isBandFM() -> Int {
        if frequency >= RadioStation.minFMFrequency && frequency <= RadioStation.maxAMFrequency{
            return 1 //FM
        }else{
            return 0 //AM
            
        }
    }
    

}
