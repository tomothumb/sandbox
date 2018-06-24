//
//  SecondViewController.swift
//  BookTutorial
//
//  Created by Tomoyuki Tsujimoto on 2018/06/24.
//  Copyright © 2018年 Socialis. All rights reserved.
//

import UIKit

class SecondViewController: UIViewController {

    @IBOutlet weak var dataTextField: UITextField!
    
    
    let ap = UIApplication.shared.delegate as! AppDelegate
    
    override func viewWillAppear(_ animated: Bool) {
        let inchValue = ap.cmValue * 0.3937
        dataTextField.text = String( inchValue )
    }
    
    @IBAction func tapInput(_ sender: Any) {
        dataTextField.resignFirstResponder()
        if let text = dataTextField.text {
            if let cmValue = Double(text){
                ap.cmValue = cmValue / 0.3937
            }
        }
        
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
