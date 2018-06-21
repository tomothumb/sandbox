//
//  ViewController.swift
//  DemoApp
//
//  Created by Tomoyuki Tsujimoto on 2018/06/17.
//  Copyright © 2018年 Socialis. All rights reserved.
//

import UIKit
import CoreData


class ViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    var managedObjectContext: NSManagedObjectContext!

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return loadBooks().count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "Cell") else { return UITableViewCell() }
        let book: Book = loadBooks()[indexPath.row]
        cell.textLabel?.text = book.title
        return cell
    }
    
    
    @IBOutlet weak var randomNumberLabel: UILabel!
    @IBOutlet weak var nameLabel: UILabel!
    
    @IBOutlet weak var stationName: UILabel!
    @IBOutlet weak var stationFrequency: UILabel!
    @IBOutlet weak var stationBand: UILabel!
    
    @IBOutlet weak var myTableView: UITableView!

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
        let appDelegate: AppDelegate = UIApplication.shared.delegate as! AppDelegate
        managedObjectContext = appDelegate.persistentContainer.viewContext as NSManagedObjectContext
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
    @IBAction func addNew(_ sender: Any) {
        let book: Book = NSEntityDescription.insertNewObject(forEntityName: "Book", into: managedObjectContext) as! Book
        book.title = "My Book" + String(loadBooks().count)
        do {
            try managedObjectContext.save()
        } catch let error as NSError {
            NSLog("My Error: %@", error)
        }
        myTableView.reloadData()
    }
    
    func loadBooks() -> [Book] {
        let fetchRequest: NSFetchRequest<Book> = Book.fetchRequest()
        var result: [Book] = []
        do {
            result = try managedObjectContext.fetch(fetchRequest)
        } catch {
            NSLog("My Error: %@", error as NSError)
        }
        return result
    }

    
}

