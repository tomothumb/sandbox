//
//  CameraMLViewController.swift
//  VisionApiSample
//
//  Created by Tomoyuki Tsujimoto on 2019/02/17.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit
import AVKit
import Vision

class CameraMLViewController: UIViewController, AVCaptureVideoDataOutputSampleBufferDelegate {
    
    
    let redView: UIView = {
        let v = UIView()
        v.backgroundColor = .red
        v.alpha = 0.4
        v.translatesAutoresizingMaskIntoConstraints = false
        return v
    }()
    
    
    var w:CGFloat = 0.0
    var h:CGFloat = 0.0
    var x:CGFloat = 0.0
    var y:CGFloat = 0.0
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let captureSession = AVCaptureSession()
        captureSession.sessionPreset = .photo

        // フロントカメラ
//        guard let captureDevice = AVCaptureDevice.default(AVCaptureDevice.DeviceType.builtInWideAngleCamera, for: AVMediaType.video, position: AVCaptureDevice.Position.front) else { return }

        // リアカメラ
        guard let captureDevice = AVCaptureDevice.default(for: AVMediaType.video) else { return }

        guard let input = try? AVCaptureDeviceInput(device: captureDevice) else { return }
        captureSession.addInput(input)
        captureSession.startRunning()

        let previewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
        view.layer.addSublayer(previewLayer)
        previewLayer.frame = view.frame
        
        view.addSubview(redView)
        redViewTop = redView.topAnchor.constraint(equalTo: view.topAnchor, constant:0)
        redViewTop?.isActive = true
        redViewLeft = redView.leftAnchor.constraint(equalTo: view.leftAnchor, constant:0)
        redViewLeft?.isActive = true
        redViewWidth = redView.widthAnchor.constraint(equalToConstant:100)
        redViewWidth?.isActive = true
        redViewHeight = redView.heightAnchor.constraint(equalToConstant:100)
        redViewHeight?.isActive = true

        let dataOutput = AVCaptureVideoDataOutput()
        dataOutput.setSampleBufferDelegate(self, queue: DispatchQueue(label: "videoQueue"))
        captureSession.addOutput(dataOutput)
        
    }

    var redViewTop : NSLayoutConstraint?
    var redViewLeft : NSLayoutConstraint?
    var redViewWidth : NSLayoutConstraint?
    var redViewHeight : NSLayoutConstraint?

    
    
    
    func captureOutput(_ output: AVCaptureOutput, didOutput sampleBuffer: CMSampleBuffer, from connection: AVCaptureConnection) {
        //        print("Camera was able to capture a frame:", Date())
        
        guard let pixelBuffer: CVPixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else { return }
        
        //        guard let model = try? VNCoreMLModel(for: SqueezeNet().model) else { return }
        guard let model = try? VNCoreMLModel(for: Resnet50().model) else { return }
        
        
        
        let request = VNDetectFaceRectanglesRequest { (req, err) in
            
            if let err = err {
                print("Failed to detect faces:", err)
                return
            }
            
            req.results?.forEach({ (res) in
//                print(res)
                
                DispatchQueue.main.async {
                    guard let faceObservation = res as? VNFaceObservation else { return }
                    
//                    print(faceObservation.boundingBox , faceObservation.boundingBox.origin.x)
                    
                    self.w = self.view.frame.width * faceObservation.boundingBox.width
                    self.h = (self.view.frame.height - 100) * faceObservation.boundingBox.height
                    self.x = self.view.frame.width * faceObservation.boundingBox.origin.x
                    self.y = (self.view.frame.height - 100) * ( 1 - faceObservation.boundingBox.origin.y) - self.h
                    
                    
                    
                    self.redViewTop?.constant = self.x
                    self.redViewLeft?.constant = self.y
                    self.redViewWidth?.constant = self.w
                    self.redViewHeight?.constant = self.h

////                    self.redView.frame = CGRect(x: x, y: y, width: w, height: h)
//                    self.redView.topAnchor.constraint(equalTo:  self.view.safeAreaLayoutGuide.topAnchor, constant: self.y).isActive = true
//                    self.redView.leftAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.leftAnchor, constant: self.x).isActive = true
//
//                    self.redView.widthAnchor.constraint(equalToConstant: self.w).isActive = true
//                    self.redView.heightAnchor.constraint(equalToConstant: self.h).isActive = true
                    
                    print(faceObservation.boundingBox.width,faceObservation.boundingBox.height,faceObservation.boundingBox.origin.x,faceObservation.boundingBox.origin.y, self.w,self.h,self.x,self.y)
                }
            })
            
        }
        
        try? VNImageRequestHandler(cvPixelBuffer: pixelBuffer, options: [:]).perform([request])
        
    }
    
}
