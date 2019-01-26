//
//  ViewController.swift
//  YoutubeClone
//
//  Created by Tomoyuki Tsujimoto on 2019/01/26.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit

class HomeController: UICollectionViewController, UICollectionViewDelegateFlowLayout {
    
    var videos: [Video]?
//    var videos: [Video] = {
//        var kanyeChannel = Channel()
//        kanyeChannel.name = "KanyeIsTheBestChannel"
//        kanyeChannel.profileImageName = "kanye_profile"
//
//
//        var blankSpaceVideo = Video()
//        blankSpaceVideo.title = "TaylorSwift - Blank space"
//        blankSpaceVideo.thumbnailImageName = "taylor_swift_blank_space"
//        blankSpaceVideo.channel = kanyeChannel
//        blankSpaceVideo.numberOfViews = 2000000
//        blankSpaceVideo.channel = kanyeChannel
//
//
//        var badBloodVideo = Video()
//        badBloodVideo.title = "TaylorSwift - Bad Blood featuring Kendrick"
//        badBloodVideo.thumbnailImageName = "taylor_swift_bad_blood"
//        badBloodVideo.channel = kanyeChannel
//        badBloodVideo.numberOfViews = 1333
//
//        return [blankSpaceVideo, badBloodVideo]
//    }()
    
    override var preferredStatusBarStyle: UIStatusBarStyle{
        return .lightContent
    }
    
    // Youtubeの再生リストのJSON リクエスト
    func fetchVideos(){
        guard let url = URL(string: "https://s3-us-west-2.amazonaws.com/youtubeassets/home.json") else { return }

        URLSession.shared.dataTask(with: url) { (data, res, err) in

            if err != nil {
                print(err!)
                return
            }
            
            let str = NSString(data: data!, encoding: String.Encoding.utf8.rawValue)
            print("success")
            print(str!)
            
            do {
                let json = try JSONSerialization.jsonObject(with: data!, options: JSONSerialization.ReadingOptions.mutableContainers)
                self.videos = [Video]()
                
                // jsonをパースし、videoオブジェクトに追加する。
                for dictionary in json as! [[String: AnyObject]] {
                    let video = Video()
                    video.title = dictionary["title"] as? String
                    // サムネのURLをセット
                    video.thumbnailImageName = dictionary["thumbnail_image_name"] as? String
                    //channelをセット
                    let channelDictionary = dictionary["channel"] as! [String: AnyObject]
                    let channel = Channel()
                    channel.name = channelDictionary["name"] as? String
                    channel.profileImageName = channelDictionary["profile_image_name"] as? String
                    
                    video.channel = channel
                    self.videos?.append(video)
                }

                //Json読み込み後にViewをリロード
                DispatchQueue.main.async {
                    self.collectionView?.reloadData()
                }


            } catch let jsonErr {
                print("Error serializing json:", jsonErr)
            }

//            guard let data = data else { return }
//////            let dataAsString = String(data: data, encoding: String.Encoding.utf8)
//////            print(dataAsString)
//            do {
//                // Courses widh Missing field
//                let videos = try JSONDecoder().decode(Video.self, from: data)
//                print(videos)
//
//                self.collectionView?.reloadData()
//
//            } catch let jsonErr {
//                print("Error serializing json:", jsonErr)
//            }
            
            }.resume()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        fetchVideos()
        
        navigationController?.navigationBar.isTranslucent = false
        
        let titleLabel = UILabel(frame: CGRect(x: 0, y: 0, width: view.frame.width - 32, height: view.frame.height))
        titleLabel.text = "Home"
        titleLabel.textColor = .white
        titleLabel.font = UIFont.systemFont(ofSize: 20)
        navigationItem.titleView = titleLabel
        
        
        collectionView?.alwaysBounceVertical = true
        collectionView?.backgroundColor = .white
        
        collectionView?.register(VideoCell.self, forCellWithReuseIdentifier: "cellId")
        // viewにスクロール領域の余白を作る
        collectionView?.contentInset = UIEdgeInsets(top: 50, left: 0, bottom: 0, right: 0)
        // スクロール領域のズレを調整
        collectionView?.scrollIndicatorInsets = UIEdgeInsets(top: 50, left: 0, bottom: 0, right: 0)
        
        setupMenuBar()
        setupNavBarButtons()
        
    }
    
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
    
    // 検索ボタンアクション
    @objc func handleSearch(){
        print(111)
    }
    
    // Moreボタンアクション
    @objc func handleMore(){
        print(222)
    }

    
    let menuBar: MenuBar = {
        let mb = MenuBar()
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
    
    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        
        return videos?.count ?? 0
    }

    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "cellId", for: indexPath) as! VideoCell
        cell.video = videos?[indexPath.item]
//        cell.backgroundColor = .red
        return cell
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        let height = (view.frame.width - 16 - 16) * 9 / 16
        return CGSize(width: view.frame.width, height: height + 16 + 80)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAt section: Int) -> CGFloat {
        return 0
    }

}
