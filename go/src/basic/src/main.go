package main

import (
	"fmt"
	"time"
	"math"
)


type user struct {
	name string
	blood_type string
	age int
}


// Interface
type Animal interface {
	Say()
}
type Dog struct{}
type Cat struct{}

func (d Dog) Say(){
	fmt.Println("Bow")
}
func (c Cat) Say(){
	fmt.Println("Nyao")
}

const weight = 63
const height = 173

// @link: https://qiita.com/gcfuji/items/e2a3d7ce7ab8868e37f7
func main()  {
	fmt.Println(1)
	fmt.Println(2)

	//https://news.mynavi.jp/article/gogogo-1/
	var hm = height / 100.0
	var bmi = weight / math.Pow(hm, 2)
	var bestW = math.Pow(hm, 2) * 22.0
	var per = weight / bestW * 100
	// 結果を表示 --- (*4)
	fmt.Printf("BMI=%f, 肥満度=%.0f\n", bmi, per)


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

	// map
	mymap1 := map[string]int{"aaa":222,"bbb":444}
	mymap2 := map[string]bool{"aaa":true,"bbb":false}
	fmt.Println(mymap1,mymap2)

	mymap1_v,mymap1_v_ok := mymap1["aaa"]
	mymap1_v2,mymap1_v2_ok := mymap1["hoge"]
	fmt.Println(mymap1_v,mymap1_v_ok)
	fmt.Println(mymap1_v2,mymap1_v2_ok)
	delete(mymap1,"aaa")
	fmt.Println(mymap1)

	// if
	myscore := 10
	if myscore > 100 {
		fmt.Println(myscore, "more than 100")
	}else if myscore == 100 {
		fmt.Println(myscore, "equal 100")
	}else{
		fmt.Println(myscore, "less than 100")
	}

	if myscore2 :=100 ; myscore2 < 20 {
		fmt.Println(myscore2 , "less than 20")
	} else if myscore2 > 1 {
		fmt.Println(myscore2 , "bigger than 1")
	} else {
		fmt.Println(myscore2 , " else")
	}

	// switch
	mycolor := "black"
	switch mycolor{
	case "blue":
		fmt.Println("blue")
	case "red":
		fmt.Println("red")
	case "white", "black":
		fmt.Println("white black")
	case "green":
		fmt.Println("green")
	default:
		fmt.Println("other color")
	}

	switch_score := 20
	switch {
	case switch_score < 10:
		fmt.Println(switch_score,"less than 10")
	case switch_score > 30:
		fmt.Println(switch_score,"bigger than 30")
	default:
		fmt.Println(switch_score,"between 10 and 30")
	}

	// For
	for count := 1; count < 5; count++{
		fmt.Println(count)
	}
	count2 := 10
	for ; count2 < 15; count2++{
		fmt.Println(count2)
	}
	count3 := 100
	for count3 < 105 {
		fmt.Println(count3)
		count3++
	}

	// range
	items := []int{10,20,30}
	for key, val := range items {
		fmt.Println(key, val)
	}

	items2 := []int{10,20,30}
	for _, val := range items2 {
		fmt.Println(val)
	}

	mapitems := map[string]int{"aaa":111,"bbb":222}
	for key, val := range mapitems {
		fmt.Println( key, val)
	}
	mapitems2 := map[string]int{"ccc":333,"ddd":444}
	for _,val := range mapitems2{
		fmt.Println( val)
	}
	mapitems3 := map[string]int{"eee":555,"fff":666}
	for val,_ := range mapitems3{
		fmt.Println( val)
	}
	mapitems4 := map[string]int{"ggg":777,"hhh":888}
	for val := range mapitems4{
		fmt.Println( val)
	}

	// 構造体
	u1 := new(user)
	u1.name = "abc"
	u1.blood_type = "B"
	u1.age = 1
	fmt.Println(u1.name, u1)

	u2 := user{name:"xyz",age:99}
	fmt.Println(u2.name, u2, &u2)
	u2.age = 99
	fmt.Println(u2.name, u2, &u2)

	// struct 構造体のメソッド
	u1.profile()
	u2.profile()
	u1.birthday()
	u2.birthday()
	u1.profile()
	u2.profile()

	// Interface
	dog_instance := Dog{}
	dog_instance.Say()
	cat_instance := Cat{}
	cat_instance.Say()

	animals := []Animal{Dog{}, Cat{}}
	for _, ani := range animals{
		ani.Say()
	}

	whoAreYou(*u1)
	whoAreYou(u1)
	whoAreYou(u2)
	whoAreYou(dog_instance)
	whoAreYou(cat_instance)

	// goroutine
	go task1()
	go task2()
	go task3(99)
	time.Sleep(time.Second * 3)

	// channel
	channel_result := make(chan string)
	channel_result2 := make(chan string)
	go channel_task1(channel_result)
	go channel_task2()
	go channel_task3(999,channel_result2)

	fmt.Println(<-channel_result)
	fmt.Println(<-channel_result2)
	time.Sleep( time.Second * 3)

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

func (u *user) profile() {
	fmt.Println("aaaaa")
	fmt.Printf("age %d \n", u.age)
	fmt.Printf("blood_type %s \n", u.blood_type)
}
func (u *user) birthday() {
	u.age += 1
}

// インスタンスを引数
func whoAreYou(t interface{}){
	_,ok := t.(user)
	if ok{
		fmt.Println( "Im user")
	}
	_,ok2 := t.(Dog)
	if ok2{
		fmt.Println( "Im dog")
	}
	_,ok3 := t.(Cat)
	if ok3{
		fmt.Println( "Im cat")
	}

	switch t.(type) {
	case Dog:
		fmt.Println("DDDOOOGGG")
	case Cat:
		fmt.Println("CCCAAATTT")
	case user:
		fmt.Println("uuussseeerrr")
	default:
		fmt.Println( "other type")
	}
}

// goroutine
func task1(){
	time.Sleep(time.Second * 2)
	fmt.Println("task1 finished.")
}
func task2(){
	time.Sleep(time.Second * 1)
	fmt.Println("task2 finished.")
}
func task3(i int){
	fmt.Println(i)
	time.Sleep(time.Second * 1)
	fmt.Println(i)
	fmt.Println("task3 finished.")
}

func channel_task1( result chan string){
	time.Sleep( time.Second * 2)
	fmt.Println("channel_task1 finished")
	result <- "channel_task1 result"
}
func channel_task2(){
	fmt.Println("channel_task2 finished")
}
func channel_task3(i int, result chan string){
	fmt.Println(i)
	time.Sleep( time.Second * 2)
	fmt.Println("channel_task3 finished")
	result <- "channel_task3 result"
}
