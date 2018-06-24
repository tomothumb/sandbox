//
//  FirstViewController.swift
//  BookTutorial
//
//  Created by Tomoyuki Tsujimoto on 2018/06/24.
//  Copyright © 2018年 Socialis. All rights reserved.
//

import UIKit

class FirstViewController: UIViewController {

    @IBOutlet weak var dataTextField: UITextField!
    
    let ap = UIApplication.shared.delegate as! AppDelegate
    
    override func viewWillAppear(_ animated: Bool) {
        dataTextField.text = String( ap.cmValue )
    }
    
    @IBAction func tapInput() {
        
        dataTextField.resignFirstResponder()
        if let text = dataTextField.text {
            if let cmValue = Double(text){
                ap.cmValue = cmValue
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
