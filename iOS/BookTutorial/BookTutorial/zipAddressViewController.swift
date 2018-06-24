//
//  zipAddressViewController.swift
//  BookTutorial
//
//  Created by Tomoyuki Tsujimoto on 2018/06/24.
//  Copyright © 2018年 Socialis. All rights reserved.
//

import UIKit

class zipAddressViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {
    
    var fontName_array:[String] = []
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return fontName_array.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell(style: UITableViewCellStyle.subtitle, reuseIdentifier: "myCell")
        
        let fontname = fontName_array[indexPath.row]
        cell.textLabel?.font = UIFont(name: fontname, size: 18)
        cell.textLabel?.text = "ABCDE abcde 01234 あいうえお"
        
        cell.detailTextLabel?.textColor = UIColor.brown
        cell.detailTextLabel?.text = fontname
        return cell
    }
    

    
    @IBOutlet weak var zipTextField: UITextField!
    @IBOutlet weak var prefLabel: UILabel!
    @IBOutlet weak var addressLabel: UILabel!
    
    @IBAction func tapReturn(_ sender: Any) {
    }
    
    @IBAction func returnAddressTop( segue: UIStoryboardSegue){
        
    }
    
    
    @IBAction func tapSearch() {
        guard let ziptext = zipTextField.text else {
            return
        }
        
        let urlStr = "http://api.zipaddress.net/?zipcode=\(ziptext)"
        print(urlStr)
        
        if let url = URL( string:urlStr) {
            let urlSession = URLSession.shared;
            let request = URLRequest(url: url)

            let task = urlSession.dataTask(with: request, completionHandler: self.onGetAddress )
//            let task = urlSession.dataTask(with: request, completionHandler)
//            let task = urlSession.dataTask(with: url, completionHandler: self.onGetAddress)
            task.resume()
        }
    }

    func onGetAddress( data: Data?, res: URLResponse?, error: Error?) -> Void {
        
//        let nsdata:NSData = NSData(data: data!)
        
        print(data!)
        do {
            let jsonDic = try JSONSerialization.jsonObject(with:data!, options:JSONSerialization.ReadingOptions.allowFragments ) as! NSDictionary

            if let code = jsonDic["code"] as? Int {
                if code != 200 {
                    if let errmsg = jsonDic["message"] as? String {
                        print(errmsg)
                        DispatchQueue.main.async(){
                            self.prefLabel.text = errmsg
                        }
                    }
                }
            }
            if let data = jsonDic["data"] as? NSDictionary {
                if let pref = data["pref"] as? String {
                    print("都道府県は\(pref)です")
                    DispatchQueue.main.async(){
                        self.prefLabel.text = pref
                    }
                }
                if let address = data["address"] as? String {
                    print("住所は\(address)です")
                    DispatchQueue.main.async(){
                        self.addressLabel.text = address
                    }
                }
            }
        } catch{
            print("エラー")
            DispatchQueue.main.async(){
                self.prefLabel.text = "エラー"
            }
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        for fontFamilyName in UIFont.familyNames{
            for fontName in UIFont.fontNames(forFamilyName: fontFamilyName as String){
                fontName_array.append(fontName as String)
            }
        }
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
