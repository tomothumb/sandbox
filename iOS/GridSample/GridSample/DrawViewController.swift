//
//  DrawViewController.swift
//  GridSample
//
//  Created by Tomoyuki Tsujimoto on 2019/02/20.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit

class DrawViewController: UIViewController {

    let canvas = Canvas()
    
    // UndoButton
    let undoButton: UIButton = {
        let button = UIButton(type: UIButton.ButtonType.system)
        button.setTitle("Undo", for: UIControl.State.normal)
        button.titleLabel?.font = UIFont.boldSystemFont(ofSize: 14)
        button.addTarget(self, action: #selector(handleUndo), for: .touchUpInside)
        return button
    }()
    
    @objc fileprivate func handleUndo(){
        print("Undo Lines Drawn")
        canvas.undo()
    }
    
    // ClearButton
    let clearButton: UIButton = {
        let button = UIButton(type: UIButton.ButtonType.system)
        button.setTitle("Clear", for: UIControl.State.normal)
        button.titleLabel?.font = UIFont.boldSystemFont(ofSize: 14)
        button.addTarget(self, action: #selector(handleClear), for: .touchUpInside)
        return button
    }()
    
    @objc fileprivate func handleClear(){
        print("Clear Lines Drawn")
        canvas.clear()
    }
    
    let yellowButton: UIButton = {
        let button = UIButton(type: UIButton.ButtonType.system)
        button.addTarget(self, action: #selector(handleColorChange), for: .touchUpInside)
        button.layer.borderWidth = 1
        button.backgroundColor = .yellow
        return button
    }()

    let redButton: UIButton = {
        let button = UIButton(type: UIButton.ButtonType.system)
        button.addTarget(self, action: #selector(handleColorChange), for: .touchUpInside)
        button.layer.borderWidth = 1
        button.backgroundColor = .red
        return button
    }()

    let blueButton: UIButton = {
        let button = UIButton(type: UIButton.ButtonType.system)
        button.addTarget(self, action: #selector(handleColorChange), for: .touchUpInside)
        button.layer.borderWidth = 1
        button.backgroundColor = .blue
        return button
    }()
    
    @objc fileprivate func handleColorChange(button: UIButton){
        canvas.setStrokeColor(color: button.backgroundColor ?? .black)
    }

    
    let slider: UISlider = {
        let slider = UISlider()
        slider.minimumValue = 1
        slider.maximumValue = 10
        slider.addTarget(self, action: #selector(handleSliderChange), for: .valueChanged)
        return slider
    }()
    @objc fileprivate func handleSliderChange(){
        canvas.setStrokeWidth(width: slider.value)
    }


    override func loadView() {
        self.view = canvas
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        canvas.backgroundColor = .white
        
        setupLayout()
    }
    
    fileprivate func setupLayout(){
        let colorsStackView = UIStackView(arrangedSubviews: [
            redButton,
            yellowButton,
            blueButton
            ])
        colorsStackView.distribution = .fillEqually
        
        let stackView = UIStackView(arrangedSubviews: [
            undoButton,
            clearButton,
            colorsStackView,
            slider
            ])
        stackView.spacing = 12
        stackView.distribution = .fillEqually
        stackView.translatesAutoresizingMaskIntoConstraints = false
        
        view.addSubview(stackView)
        //        stackView.frame = CGRect(x: 50, y: 100, width: 200, height: 100)
        stackView.leadingAnchor.constraint(equalTo: view.leadingAnchor).isActive = true
        stackView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -10).isActive = true
        stackView.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -8).isActive = true

    }
    

}
