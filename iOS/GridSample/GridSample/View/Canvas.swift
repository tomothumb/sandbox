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
    
    fileprivate var strokeColor = UIColor.black
    fileprivate var strokeWidth: Float = 5

    func setStrokeColor(color: UIColor){
        self.strokeColor = color
    }
    
    func setStrokeWidth(width: Float){
        self.strokeWidth = width
    }
    
    override func draw(_ rect: CGRect) {
        super.draw(rect)
        
        guard let context = UIGraphicsGetCurrentContext() else { return }
        

        lines.forEach { (line) in
            context.setStrokeColor(line.color.cgColor)
            context.setLineWidth(CGFloat(line.strokeWidth))
            context.setLineCap(CGLineCap.round)
            for(i, p) in line.points.enumerated() {
                if i == 0 {
                    context.move(to: p)
                } else {
                    context.addLine(to: p)
                }
            }
            context.strokePath()
        }
    }
    
    fileprivate var lines = [Line]()
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        lines.append(Line.init(color: strokeColor, strokeWidth: strokeWidth, points: []))
    }
    
    // track the finger as we move across screen
    override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
        guard let point = touches.first?.location(in: nil) else { return }
//        print(point)
        
        guard var lastLine = lines.popLast() else { return }
        lastLine.points.append(point)
        lines.append(lastLine)
        
        //        var lastline = lines.last
        //        lastline?.append(point)
        
        setNeedsDisplay()
    }
}
