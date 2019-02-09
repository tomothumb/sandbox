//
//  UserCell.swift
//  FirebaseSample
//
//  Created by Tomoyuki Tsujimoto on 2019/02/10.
//  Copyright © 2019年 Tomoyuki Tsujimoto. All rights reserved.
//

import UIKit
import FirebaseDatabase

class UserCell: UITableViewCell {

    var message: Message? {
        didSet {
            // 読み込む
            if let toId = message?.toId {
                let ref = Database.database().reference().child("users").child(toId)
                ref.observeSingleEvent(of: DataEventType.value, with: { (snapshot) in
                    
                    if let dictionary = snapshot.value as? [String: AnyObject] {
                        // 名前
                        self.textLabel?.text = dictionary["name"] as? String
                        // サムネイル
                        if let profileImageUrl = dictionary["profileImageUrl"] as? String {
                            self.profileImageView.loadImageUsingCacheWithUrlString(urlString: profileImageUrl)
                        }
                    }
                }, withCancel: nil)
            }
            //        cell.textLabel?.text = message.toId
            detailTextLabel?.text = message?.text
            
            // 時刻
            if let seconds = message?.timestamp?.doubleValue {
                let timestampDate = Date(timeIntervalSince1970: seconds)
                let dateFormatter = DateFormatter()
                dateFormatter.dateFormat = "hh:mm:ss a"
                timeLabel.text = dateFormatter.string(from: timestampDate)
            }
        }
    }
    override func layoutSubviews() {
        super.layoutSubviews()
        
        textLabel?.frame = CGRect(x: 64, y: textLabel!.frame.origin.y - 2, width: textLabel!.frame.width, height: textLabel!.frame.height)
        detailTextLabel?.frame = CGRect(x: 64, y: detailTextLabel!.frame.origin.y + 2, width: detailTextLabel!.frame.width, height: detailTextLabel!.frame.height)
    }
    
    let profileImageView: UIImageView = {
        let iv = UIImageView()
        //        iv.image = UIImage(named: "gameofthrones_splash")
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.layer.cornerRadius = 24
        iv.layer.masksToBounds = true
        iv.contentMode = .scaleAspectFill
        return iv
    }()
    
    let timeLabel: UILabel = {
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        label.font = UIFont.systemFont(ofSize: 12)
        label.textColor = UIColor.darkGray
        label.text = "his"
        return label
    }()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style:.subtitle, reuseIdentifier: reuseIdentifier)
        
        addSubview(profileImageView)
        addSubview(timeLabel)
        
        profileImageView.leftAnchor.constraint(equalTo: self.leftAnchor, constant: 8).isActive = true
        profileImageView.centerYAnchor.constraint(equalTo: self.centerYAnchor).isActive = true
        profileImageView.widthAnchor.constraint(equalToConstant: 48).isActive = true
        profileImageView.heightAnchor.constraint(equalToConstant: 48).isActive = true
        
        timeLabel.rightAnchor.constraint(equalTo: self.rightAnchor).isActive = true
        timeLabel.topAnchor.constraint(equalTo: self.topAnchor, constant:18 ).isActive = true
        timeLabel.widthAnchor.constraint(equalToConstant: 100).isActive = true
        timeLabel.heightAnchor.constraint(equalTo: (textLabel?.heightAnchor)!).isActive = true
        
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    
//    override func awakeFromNib() {
//        super.awakeFromNib()
//        // Initialization code
//    }

//    override func setSelected(_ selected: Bool, animated: Bool) {
//        super.setSelected(selected, animated: animated)
//
//        // Configure the view for the selected state
//    }

    
}
