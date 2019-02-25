//
//  ViewController.swift
//  SampleMapApp
//
//  Created by Tomoyuki Tsujimoto on 2019/02/24.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit
import MapKit

class ViewController: UIViewController {

    @IBOutlet weak var mapView: MKMapView!
    
    
    @IBAction func moveMap(_ sender: Any) {
        print("clickされた")
        let address = "大阪府大阪市中央区1-1-1"
        CLGeocoder().geocodeAddressString(address) { [weak mapView] placemarks, error in
            guard let loc = placemarks?.first?.location?.coordinate else {
                return
            }
            print("緯度 : \(loc.latitude)")
            print("経度 : \(loc.longitude)")
            print("移動した")

            // 地図の中心の緯度・軽度を設定
            mapView?.setCenter(loc ,animated:true)
            
            
            // 縮尺を設定
            let region = MKCoordinateRegion(center: loc,
                                            span: MKCoordinateSpan(latitudeDelta: 0.02, longitudeDelta: 0.02))
            mapView?.setRegion(region,animated:true)
            
            // マップにピンを刺す
            let annotation = MKPointAnnotation()
            annotation.coordinate = loc
            annotation.title = "緯度 : \(loc.latitude) 経度 : \(loc.longitude)"
            mapView?.addAnnotation(annotation)
            

        }


    }
    

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        let address = "大阪府大阪市港区1-1-1"
        CLGeocoder().geocodeAddressString(address) { [weak mapView] placemarks, error in
            guard let loc = placemarks?.first?.location?.coordinate else {
                return
            }
            print("緯度 : \(loc.latitude)")
            print("経度 : \(loc.longitude)")
            print("1111111111")

            // 地図の中心の緯度・軽度を設定
            mapView?.setCenter(loc ,animated:true)
            
            // 縮尺を設定
            let region = MKCoordinateRegion(center: loc,
                                            span: MKCoordinateSpan(latitudeDelta: 0.02, longitudeDelta: 0.02))
            mapView?.setRegion(region,animated:true)
            
            // マップにピンを刺す
            let annotation = MKPointAnnotation()
            annotation.coordinate = loc
            annotation.title = "緯度 : \(loc.latitude) 経度 : \(loc.longitude)"
            mapView?.addAnnotation(annotation)
        }
        
        // マップ表示形式
        mapView.mapType = MKMapType.standard
        // mapView.mapType = MKMapType.hybrid
        // mapView.mapType = MKMapType.satellite
    }

    
}
