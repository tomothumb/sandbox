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

    override func loadView() {
        self.view = canvas
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        canvas.backgroundColor = .white
        
        setupLayout()
    }
    
    fileprivate func setupLayout(){
        let stackView = UIStackView(arrangedSubviews: [
            undoButton,
            clearButton
            ])
        stackView.distribution = .fillEqually
        stackView.translatesAutoresizingMaskIntoConstraints = false
        
        view.addSubview(stackView)
        //        stackView.frame = CGRect(x: 50, y: 100, width: 200, height: 100)
        stackView.leadingAnchor.constraint(equalTo: view.leadingAnchor).isActive = true
        stackView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor).isActive = true
        stackView.trailingAnchor.constraint(equalTo: view.trailingAnchor).isActive = true

    }
    

}
