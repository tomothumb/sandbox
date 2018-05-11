package main

import "fmt"

// @link  https://qiita.com/tenntenn/items/eac962a49c56b2b15ee8
func main() {
	fmt.Println(1)
	h := Hex(2)
	h2 := int(h)
	fmt.Println(h)
	fmt.Println(h2)
}

type Hex int
