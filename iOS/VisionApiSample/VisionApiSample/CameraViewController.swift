//
//  CameraViewController.swift
//  VisionApiSample
//
//  Created by Tomoyuki Tsujimoto on 2019/02/17.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit
import AVKit
import Vision

class CameraViewController: UIViewController, AVCaptureVideoDataOutputSampleBufferDelegate {

    let label: UILabel = {
        let label = UILabel();
        label.text = "aaaaa"
        label.font = UIFont.systemFont(ofSize: 16)
        label.translatesAutoresizingMaskIntoConstraints = false
        label.numberOfLines = 0

        return label;
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()

        let captureSession = AVCaptureSession()
        captureSession.sessionPreset = .photo
        
        guard let captureDevice = AVCaptureDevice.default(for: AVMediaType.video) else { return }
        
        guard let input = try? AVCaptureDeviceInput(device: captureDevice) else { return }
        captureSession.addInput(input)
        captureSession.startRunning()
        
        let previewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
        view.layer.addSublayer(previewLayer)
        previewLayer.frame = view.frame
        
        let dataOutput = AVCaptureVideoDataOutput()
        dataOutput.setSampleBufferDelegate(self, queue: DispatchQueue(label: "videoQueue"))
        captureSession.addOutput(dataOutput)
        
        view.addSubview(label)
        
        label.bottomAnchor.constraint(equalTo:  view.bottomAnchor, constant: 30).isActive = true
        label.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 20).isActive = true
        label.widthAnchor.constraint(equalTo: view.widthAnchor, constant: 0).isActive = true
        label.heightAnchor.constraint(equalTo: view.heightAnchor, constant: 0).isActive = true
    }
    
    func captureOutput(_ output: AVCaptureOutput, didOutput sampleBuffer: CMSampleBuffer, from connection: AVCaptureConnection) {
//        print("Camera was able to capture a frame:", Date())
        
        guard let pixelBuffer: CVPixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else { return }
        
//        guard let model = try? VNCoreMLModel(for: SqueezeNet().model) else { return }
        guard let model = try? VNCoreMLModel(for: Resnet50().model) else { return }
        
        let request = VNCoreMLRequest(model: model) { (finishedReq, err) in
            
            DispatchQueue.main.async {

    //            print(finishedReq.results)
                guard let results = finishedReq.results as? [VNClassificationObservation] else { return }
                guard let firstObservation = results.first else { return }
                
                print(firstObservation.identifier, firstObservation.confidence)
                self.label.text = firstObservation.identifier + " :: " + String(firstObservation.confidence)
                
            }
        }
        
        try? VNImageRequestHandler(cvPixelBuffer: pixelBuffer, options: [:]).perform([request])
        
    }
    
    
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
