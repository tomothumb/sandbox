//
//  ViewController.swift
//  VisionApiSample
//
//  Created by Tomoyuki Tsujimoto on 2019/02/17.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit
import Vision

class ViewController: UIViewController {

    let offset:CGFloat = 70
    override func viewDidLoad() {
        super.viewDidLoad()
        
//        let str = "girl-919048__480"
        let str = "children-817368__480"
        guard let image = UIImage(named: str) else {
            return
        }
        
        let imageView = UIImageView(image: image)
        imageView.contentMode = .scaleAspectFit
        
        let scaledHeight = view.frame.width / image.size.width * image.size.height
        
        imageView.frame = CGRect(x: 0, y: offset, width: view.frame.width, height: scaledHeight)
        imageView.backgroundColor = .black
        
        view.addSubview(imageView)
        
        let request = VNDetectFaceRectanglesRequest { (req, err) in
            
            if let err = err {
                print("Failed to detect faces:", err)
                return
            }
            
            req.results?.forEach({ (res) in
                print(res)
                
                DispatchQueue.main.async {
                    guard let faceObservation = res as? VNFaceObservation else { return }
                    
                    print(faceObservation.boundingBox , faceObservation.boundingBox.origin.x)
                    
                    let w:CGFloat = self.view.frame.width * faceObservation.boundingBox.width
                    let h:CGFloat = scaledHeight * faceObservation.boundingBox.height
                    
                    let x:CGFloat = self.view.frame.width * faceObservation.boundingBox.origin.x
                    let y:CGFloat = scaledHeight * ( 1 - faceObservation.boundingBox.origin.y) - h + self.offset
                    
                    
                    let redView = UIView()
                    redView.backgroundColor = .red
                    redView.alpha = 0.5
                    redView.frame = CGRect(x: x, y: y, width: w, height: h)
                    self.view.addSubview(redView)
                }
            })
            
        }
        
        guard let cgImage = image.cgImage else { return }
        
        DispatchQueue.global(qos: DispatchQoS.QoSClass.background).async {
            let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
            
            do {
                try handler.perform([request])
            } catch let reqErr {
                print("Failed to perform request:", reqErr)
            }
        }
        
        
    }


}

