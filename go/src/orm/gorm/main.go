package main

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"time"
	"database/sql"
)

// @link http://doc.gorm.io/crud.html
type User struct {
	gorm.Model
	Num int `gorm:"AUTO_INCREMENT"`
	Name string `gorm:"size:255"`

	Profile Profile
	ProfileID int

	CreditCard CreditCard
	Emails []Email

	BillingAddress Address
	BillingAddressId sql.NullInt64

	ShippingAddress Address
	ShippingAddressID int

	IgnoreMe int `gorm:"-"`
	Language []Language `gorm:"many2many:user_languages;"`
}

type Profile struct {
	gorm.Model
	Age int
	Birthday time.Time
}
type Email struct {
	ID	int
	Email string `gorm:"type:verchar(100);unique_index"`
	UserID	int	`gorm:"index"`
	Subscried bool
}

type Address struct{
	ID int
	Address1 string `gorm:"not null;uunique"`
	Address2 string `gorm:"type:varchar(100);unique"`
	Post sql.NullString `gorm:"not null"`
}

type Language struct {
	ID int
	Users []User `gorm:"many2many:user_languages;"`
	Name string `gorm:"index:idx_name_code"`
	Code string `gorm:"index:idex_name_code"`
}

type CreditCard struct {
	gorm.Model
	UserID uint
	Number string
}

//type Model struct {
//	ID uint `gorm:"primary_key"`
//	CreatedAt time.Time
//	UpdatedAt time.Time
//	DeletedAt *time.Time
//}


func main()  {

	db, err := gorm.Open("sqlite3", "./databases/model_sample.db")
	if err != nil {
		panic("faild to connect database")
	}
	defer db.Close()

	db.AutoMigrate(&User{},&Profile{}, &Email{}, &Email{},&Address{},&Language{},&CreditCard{})
	var user User
	var users User
	var profile Profile
	var card CreditCard
	var emails Email
	var languages Language
	var language Language

	db.Model(&user).Related(&profile)
	db.Model(&user).Related(&card,"CreditCard")

	db.Model(&user).Related(&emails)

	db.Model(&user).Related(&languages, "Languages")
	db.Preload("Languages").First(&user)

	db.Model(&language).Related(&users)



}