//
//  ViewController.swift
//  DemoApp
//
//  Created by Tomoyuki Tsujimoto on 2018/06/17.
//  Copyright © 2018年 Socialis. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet weak var randomNumberLabel: UILabel!
    @IBOutlet weak var nameLabel: UILabel!
    
    @IBOutlet weak var stationName: UILabel!
    @IBOutlet weak var stationFrequency: UILabel!
    @IBOutlet weak var stationBand: UILabel!
    
    var myStation: RadioStation
    
    required init?(coder aDecoder: NSCoder) {
        myStation = RadioStation()
        myStation.frequency = 104.7
        myStation.name = "KZZP"
        super.init(coder: aDecoder)
    }
    
    @IBAction func showName(sender: AnyObject){
        nameLabel.text = "My Name is Brad!"
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func buttonClick(_ sender: Any) {
        stationName.text = self.myStation.name
        stationFrequency.text = "\(myStation.frequency)"
        if myStation.isBandFM() == 1 {
            stationBand.text = "FM"
        }else{
            stationBand.text = "AM"
        }
    }
    @IBAction func seedAction(_ sender: Any) {
        srandom(CUnsignedInt(time(nil)))
        randomNumberLabel.text = "Genarator Seeded."
    }
    @IBAction func generateAction(_ sender: Any) {
        let generated = (arc4random() % 100) + 1
        randomNumberLabel.text = "\(generated)"
    }
    
}

