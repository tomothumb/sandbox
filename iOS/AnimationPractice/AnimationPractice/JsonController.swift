//
//  JsonController.swift
//  AnimationPractice
//
//  Created by Tomoyuki Tsujimoto on 2019/01/21.
//

import Foundation
import UIKit
struct WebsiteDescription: Decodable {
    let name: String
    let description: String
    let courses: [Course]
}
struct Course: Decodable {
    let id: Int?
    let name: String?
    let link: String?
    let imageUrl: String?
    
    // Swift 2/3/ObjC
//    init(json: [String: Any]) {
//        id = json["id"] as? Int ?? -1
//        name = json["name"] as? String ?? ""
//        link = json["link"] as? String ?? ""
//        imageUrl = json["imageUrl"] as? String ?? ""
//    }
}

class JsonController: UIViewController{
    override func viewDidLoad() {
        super.viewDidLoad()
        navigationItem.title = "Json"
        
//        // 1. Course
//        let jsonUrlString = "https://api.letsbuildthatapp.com/jsondecodable/course"

//        // 2. Courses
//        let jsonUrlString = "https://api.letsbuildthatapp.com/jsondecodable/courses"

//        // 3. Course Detail
//        let jsonUrlString = "https://api.letsbuildthatapp.com/jsondecodable/website_description"

        // 4. Courses widh Missing field
        let jsonUrlString = "https://api.letsbuildthatapp.com/jsondecodable/courses_missing_fields"
        
        guard let url = URL(string: jsonUrlString) else { return }

        URLSession.shared.dataTask(with: url) { (data, res, err) in
            print("success")
            guard let data = data else { return }
//            let dataAsString = String(data: data, encoding: String.Encoding.utf8)
//            print(dataAsString)
            
            do {
//                // Swift 2/3/ObjC
//                guard let json = try JSONSerialization.jsonObject(with: data, options: JSONSerialization.ReadingOptions.mutableContainers) as? [String: Any] else { return }
//                print(json)
//                let course = Course(json: json)
//                print(course.name)

                // Swift 4
//                // 1. Courses
//                let courses = try JSONDecoder().decode(Course.self, from: data)
//                print(courses)
                
//                // 2. Courses
//                let courses = try JSONDecoder().decode([Course].self, from: data)
//                print(courses)
                
//                // 3. Course Detail
//                let websiteDescription = try JSONDecoder().decode(WebsiteDescription.self, from: data)
//                print(websiteDescription)

                // 4. Courses widh Missing field
                let courses = try JSONDecoder().decode([Course].self, from: data)
                print(courses)
                
            } catch let jsonErr {
                print("Error serializing json:", jsonErr)
            }
            
        }.resume()
        
    }
}
