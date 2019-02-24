//
//  Canvas.swift
//  GridSample
//
//  Created by Tomoyuki Tsujimoto on 2019/02/24.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit


class Canvas: UIView {
    
    // public function
    func undo(){
        _ = lines.popLast()
        setNeedsDisplay()
    }
    
    func clear(){
        _ = lines.removeAll()
        setNeedsDisplay()
    }
    
    override func draw(_ rect: CGRect) {
        super.draw(rect)
        
        guard let context = UIGraphicsGetCurrentContext() else { return }
        
        // here are my lines
        // dummy data
        //        let startPoint = CGPoint(x: 100, y: 100)
        //        let endPoint = CGPoint(x: 200, y: 200)
        //        context.move(to: startPoint)
        //        context.addLine(to: endPoint)
        
        //        line.forEach { (p) in
        //            //
        //        }
        
        context.setStrokeColor(UIColor.red.cgColor)
        context.setLineWidth(10)
        context.setLineCap(CGLineCap.round)
        
        lines.forEach { (line) in
            for(i, p) in line.enumerated() {
                if i == 0 {
                    context.move(to: p)
                } else {
                    context.addLine(to: p)
                }
            }
        }
        
        context.strokePath()
    }
    
    //    var line = [CGPoint]()
    fileprivate var lines = [[CGPoint]]()
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        //        guard let point = touches.first?.location(in: nil) else {
        //            return
        //        }
        lines.append([CGPoint]())
    }
    
    // track the finger as we move across screen
    override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
        guard let point = touches.first?.location(in: nil) else { return }
//        print(point)
        
        guard var lastLine = lines.popLast() else { return }
        lastLine.append(point)
        lines.append(lastLine)
        
        //        var lastline = lines.last
        //        lastline?.append(point)
        
        setNeedsDisplay()
    }
}
