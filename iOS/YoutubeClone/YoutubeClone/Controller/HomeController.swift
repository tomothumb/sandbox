//
//  ViewController.swift
//  YoutubeClone
//
//  Created by Tomoyuki Tsujimoto on 2019/01/26.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit

class HomeController: UICollectionViewController, UICollectionViewDelegateFlowLayout {
    
    let cellId = "cellId"
    let trendingCellId = "trandingCellId"
    let subscriptionCellId = "subscriptionCellId"
    let titles = ["Home", "Trending", "Subscriptions", "Account"]
    
    override var preferredStatusBarStyle: UIStatusBarStyle{
        return .lightContent
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
                
        navigationController?.navigationBar.isTranslucent = false
        
        let titleLabel = UILabel(frame: CGRect(x: 0, y: 0, width: view.frame.width - 32, height: view.frame.height))
        titleLabel.text = "Home"
        titleLabel.textColor = .white
        titleLabel.font = UIFont.systemFont(ofSize: 20)
        navigationItem.titleView = titleLabel
        
        setupCollectionView()
        setupMenuBar()
        setupNavBarButtons()
    }
    
    
    // コレクション描画
    func setupCollectionView(){
        
        // 横スクロールのセクションの処理
        if let flowLayout = collectionView?.collectionViewLayout as? UICollectionViewFlowLayout{
            // 横スクロールにする
            flowLayout.scrollDirection = .horizontal
            flowLayout.minimumLineSpacing = 0
        }
        // ページングのようなスナップを可能にする
        collectionView?.isPagingEnabled = true
        
        
        collectionView?.alwaysBounceVertical = true
        collectionView?.backgroundColor = .white
        collectionView?.register(FeedCell.self, forCellWithReuseIdentifier: cellId)
        collectionView?.register(TrendingCell.self, forCellWithReuseIdentifier: trendingCellId)
        collectionView?.register(SubscriptionCell.self, forCellWithReuseIdentifier: subscriptionCellId)

        // viewにスクロール領域の余白を作る
        collectionView?.contentInset = UIEdgeInsets(top: 50, left: 0, bottom: 0, right: 0)
        // スクロール領域のズレを調整
        collectionView?.scrollIndicatorInsets = UIEdgeInsets(top: 50, left: 0, bottom: 0, right: 0)

    }
    
    // ナビバー描画
    func setupNavBarButtons(){
        
        // 検索ボタン
        let searchBtn = UIButton(type: .custom)
        searchBtn.frame = CGRect(x: 0, y: 0, width: 20, height: 20)
        searchBtn.setImage(UIImage(named: "search")?.withRenderingMode(.alwaysTemplate), for: UIControl.State.normal)
        searchBtn.tintColor = UIColor(white: 1, alpha: 1)
        searchBtn.addTarget(self, action: #selector(handleSearch), for: UIControl.Event.touchUpInside)
        
        let searchBtnItem = UIBarButtonItem(customView: searchBtn)
        searchBtnItem.customView?.widthAnchor.constraint(equalToConstant: 24).isActive = true
        searchBtnItem.customView?.heightAnchor.constraint(equalToConstant: 24).isActive = true
        
        // MOREボタン
        let moreBtn = UIButton(type: .custom)
        moreBtn.frame = CGRect(x: 0, y: 0, width: 20, height: 20)
        moreBtn.setImage(UIImage(named: "settings")?.withRenderingMode(.alwaysTemplate), for: UIControl.State.normal)
        moreBtn.tintColor = UIColor(white: 1, alpha: 1)
        moreBtn.addTarget(self, action: #selector(handleMore), for: UIControl.Event.touchUpInside)
        
        let moreBtnItem = UIBarButtonItem(customView: moreBtn)
        moreBtnItem.customView?.widthAnchor.constraint(equalToConstant: 24).isActive = true
        moreBtnItem.customView?.heightAnchor.constraint(equalToConstant: 24).isActive = true

        // 右に並べる
        navigationItem.rightBarButtonItems = [moreBtnItem, searchBtnItem]
    }
    
    // 特定のインデックスにスクロール
    func scrollToMenuIndex(menuIndex: Int){
        let indexPath = NSIndexPath(item: menuIndex, section: 0)
        collectionView?.scrollToItem(at: indexPath as IndexPath, at: [], animated: true)
    
        // ページタイトルの切り替え
        setIttleForIndex(index: menuIndex)
        
    }
    
    // ページタイトルの切り替え
    private func setIttleForIndex(index: Int){
        // ページタイトルの切り替え
        if let titleLabel = navigationItem.titleView as? UILabel {
            titleLabel.text = " \(titles[index])"
        }
    }
    
    // 検索ボタンアクション
    @objc func handleSearch(){
        print(111)
    }
    
    lazy var settingsLancher: SettingLancher = {
        let lancher = SettingLancher()
        lancher.homeController = self
        return lancher
    }()
    
    // Moreボタンアクション
    @objc func handleMore(){
    
        settingsLancher.showSettings()
    }
    
    func showControllerForSetting(setting: Setting){
        let dummySettingsViewController = UIViewController()
        dummySettingsViewController.view.backgroundColor = .white
        dummySettingsViewController.navigationItem.title = setting.name.rawValue
        //ナビの色
        navigationController?.navigationBar.tintColor = .white
        navigationController?.navigationBar.titleTextAttributes = [NSAttributedString.Key.foregroundColor: UIColor.white]
        // コントローラーをプッシュ
        navigationController?.pushViewController(dummySettingsViewController, animated: true)
    }

    
    lazy var menuBar: MenuBar = {
        let mb = MenuBar()
        mb.homeController = self
        return mb
    }()
    
    private func setupMenuBar(){
        // スワイプした時にナビを隠す
        navigationController?.hidesBarsOnSwipe = true
        
        let redView = UIView()
        redView.backgroundColor = UIColor.rgb(red: 230, green: 32, blue: 31)
        view.addSubview(redView)
        view.addConstraintsWithFormat(format: "H:|[v0]|", views: redView)
        view.addConstraintsWithFormat(format: "V:[v0(50)]", views: redView)

        view.addSubview(menuBar)
        view.addConstraintsWithFormat(format: "H:|[v0]|", views: menuBar)
        view.addConstraintsWithFormat(format: "V:[v0(50)]", views: menuBar)
        menuBar.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor).isActive = true
    }
    
    override func scrollViewDidScroll(_ scrollView: UIScrollView) {
        print(scrollView.contentOffset.x)
        // バーのアニメーション
        menuBar.horizontalBarLeftAnchorConstraint?.constant = scrollView.contentOffset.x / 4
    }
    
    
    override func scrollViewWillEndDragging(_ scrollView: UIScrollView, withVelocity velocity: CGPoint, targetContentOffset: UnsafeMutablePointer<CGPoint>) {
        
        let index = targetContentOffset.pointee.x / view.frame.width
        let indexPath = NSIndexPath(item: Int(index), section: 0)
        menuBar.collectionView.selectItem(at: indexPath as IndexPath, animated: false, scrollPosition: [])
        
        // ページタイトルの切り替え
        setIttleForIndex(index: Int(index))
    }

    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 4
    }
    
    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        
        let identifier: String
        
        if indexPath.item == 1 {
            identifier = trendingCellId
        } else if indexPath.item == 2 {
            identifier = subscriptionCellId
        } else {
            identifier = cellId
        }
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: identifier, for: indexPath)
        
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        
        return CGSize(width: view.frame.width, height: view.frame.height - 50)
    }

}
