package main

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

type Product struct {
	gorm.Model
	Code string
	Price uint
}
type Product2 struct {
	gorm.Model
	Code string
	Price uint
}
type Product3 struct {
	gorm.Model
	Code string
	Price uint
}
type Product4 struct {
	Code string
	Price uint
}

func main()  {
	fmt.Println(1)

	db, err := gorm.Open("sqlite3", "./databases/simple.db")
	if err != nil {
		panic("faild to connect database")
	}
	defer db.Close()

	// Migrate
	db.AutoMigrate(&Product{},&Product2{},&Product3{},&Product4{})

	// Create
	db.Create(&Product{Code:"A1", Price: 1000})
	fmt.Println(2)

	var product Product
	db.First(&product,1)
	db.First(&product, "code = ?", "A1")

	// Update
	db.Model(&product).Update("price",999)

	//  Delete
	db.Delete(&product)

	// Create
	db.Create(&Product2{Code:"B1", Price: 1000})
	fmt.Println(2)

	var product2 Product2
	db.First(&product2,1)
	db.First(&product2, "code = ?", "A1")

	// Update
	db.Model(&product2).Update("price",999)

	//  Delete
	db.Delete(&product2)

}