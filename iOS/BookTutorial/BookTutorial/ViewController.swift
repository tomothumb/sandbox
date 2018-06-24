//
//  ViewController.swift
//  BookTutorial
//
//  Created by Tomoyuki Tsujimoto on 2018/06/24.
//  Copyright © 2018年 Socialis. All rights reserved.
//

import UIKit
import GameplayKit

class ViewController: UIViewController {
    
    let randomSource = GKARC4RandomSource()

    @IBOutlet weak var computerImageView: UIImageView!
    @IBOutlet weak var playerImageView: UIImageView!
    @IBOutlet weak var messageLabel: UILabel!

    
    override func viewDidLoad() {
        super.viewDidLoad()
        let angle:CGFloat = CGFloat((180.0 * Double.pi) / 180.0)
        computerImageView.transform = CGAffineTransform(rotationAngle: angle)
//        computerImageView.transform = computerImageView.transform.rotated(by: 60);
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        colorR = randomSource.nextInt(upperBound: 256)
        colorG = randomSource.nextInt(upperBound: 256)
        colorB = randomSource.nextInt(upperBound: 256)
        
        colorLabel.text = "R:\(colorR) G:\(colorG) B:\(colorB)"
    }
    
    
    func doComputer(player:Int){
        let computer = randomSource.nextInt(upperBound: 3);
        var msg = "";
        switch computer {
        case 0:
            computerImageView.image = UIImage(named: "gu.png")
            switch player {
            case 0:
                msg = "あいこ"
            case 1:
                msg = "Lose"
            case 2:
                msg = "Win"
            default:
                break
            }
        case 1:
            computerImageView.image = UIImage(named: "choki.png")
            switch player {
            case 0:
                msg = "Win"
            case 1:
                msg = "あいこ"
            case 2:
                msg = "Lose"
            default:
                break
            }

        case 2:
            computerImageView.image = UIImage(named: "pa.png")
            switch player {
            case 0:
                msg = "Lose"
            case 1:
                msg = "Win"
            case 2:
                msg = "あいこ"
            default:
                break
            }
        default:
            break
        }
        messageLabel.text = msg;
        
        
        
    }

    @IBAction func tapStart() {
        computerImageView.image = UIImage(named: "gu.png")
        playerImageView.image = UIImage(named: "gu.png")
        messageLabel.text = "じゃんけん！"
    }
    @IBAction func tapGu() {
        playerImageView.image = UIImage(named: "gu.png")
        messageLabel.text = "グー！"
        doComputer(player:0);
    }
    @IBAction func tapChoki() {
        playerImageView.image = UIImage(named: "choki.png")
        messageLabel.text = "チョキ！"
        doComputer(player:1);
    }
    @IBAction func tapPa() {
        playerImageView.image = UIImage(named: "pa.png")
        messageLabel.text = "パー！"
        doComputer(player:2);
    }
    
    
    
    @IBAction func returnTop( segue: UIStoryboardSegue){
        
    }
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        let nextVC = segue.destination as! colorViewController
        nextVC.colorR = colorR
        nextVC.colorG = colorG
        nextVC.colorB = colorB
    }

    @IBOutlet weak var colorLabel: UILabel!
    var colorR = 0
    var colorG = 0
    var colorB = 0
    
    
}

