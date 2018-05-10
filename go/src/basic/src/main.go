package main

import "fmt"

// @link: https://qiita.com/gcfuji/items/e2a3d7ce7ab8868e37f7
func main()  {
	fmt.Println(1)
	fmt.Println(2)

	var a int
	var b float64
	var c string
	var d bool
	fmt.Printf("a: %d, b:%f, c:%s, d:%t\n",a,b,c,d)
	a = 2
	b = 2.2
	fmt.Printf("a: %d, b:%f, c:%s, d:%t\n",a,b,c,d)

	const (
		sun  = iota
		mon
		tue
	)
	fmt.Printf("sun: %d, mon:%d, tue:%d\n",sun,mon,tue)

	po := 5
	fmt.Println(po, &po)
	po = 6
	fmt.Println(po, &po)
	fmt.Println()

	po2 := &po
	// po2: poのポインタ
	// po2: po2自身のポインタ
	// +po2: poの値
	fmt.Println(po2, &po2, *po2)
	// poを更新すると、*po2も更新される。
	po = 9
	fmt.Println(po,&po)
	fmt.Println(po2,&po2,*po2)

	sayHi()
	sayName("AAAAA")
	fmt.Println(getName("BBBBB"))
	fmt.Println(getFirstName("XXXX"))
	fmt.Println(1,99)
	fmt.Println(swap(1,99))

	// 配列
	myarr := [...]int{1,2,3,4,5}
	myarr2 := []int{1,2,3,4}
	myarr3 := [5]int{2,4,6,8,10}
	fmt.Println(myarr,myarr2,myarr3)
	myarr3s1 := myarr3[0:3]
	myarr3s2 := myarr3[1:3]
	myarr3s3 := myarr3[2:3]
	myarr3s4 := myarr3[:3]
	myarr3s5 := myarr3[3:]
	fmt.Println(myarr3s1,myarr3s2,myarr3s3,myarr3s4,myarr3s5)
	fmt.Println(len(myarr3s4),cap(myarr3s4))

	myarr4 := make([]int,3)
	myarr5 := []int{1,2,3,4}
	myarr5add := append(myarr5,7,6)
	fmt.Println(myarr4,myarr5,myarr5add)
	myarr6 := []int{1,2,3,4}
	myarr6copy := copy(myarr6, myarr5add)
	fmt.Println(myarr6, myarr6copy)

}


func sayHi()  {
	fmt.Println("Hi")
}
func sayName(name string)  {
	fmt.Println(name)
}
func getName(s string) string {
	return s
}
func getFirstName(s string) string{
	firstname := "CCC"
	return firstname
}
func swap(first int, second int) (int,int){
	return second, first
}





