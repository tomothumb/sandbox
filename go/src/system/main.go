package main

import (
	"os"
	"bytes"
	"fmt"
	"net"
	"io"
	"compress/gzip"
	"bufio"
	"time"
	"net/http"
	"context"
	"sync"
)

// @link http://ascii.jp/elem/000/001/243/1243667/
func main()  {
	// file io
	file, err := os.Create("output/filetest.txt")
	if err != nil {
		panic(err)
	}
	file.Write([]byte("os.File example\n"))
	file.Close()

	// stdout io
	os.Stdout.Write([]byte("os.Stdout example\n"))

	// buffer io
	var buffer bytes.Buffer
	buffer.Write([]byte("bytes.Buffer Write example\n"))
	buffer.WriteString("bytes.Buffer WriteString example\n")
	fmt.Println(buffer.String())

	// http
	connection, err := net.Dial("tcp","www.google.com:80")
	if err != nil {
		panic(err)
	}
	connection.Write([]byte("GET / HTTP/1.0\r\nHost: www.google.com\r\n\r\n"))
	io.Copy(os.Stdout, connection)

	//// http serve
	//http.HandleFunc("/", handler)
	//http.ListenAndServe(":8080", nil)

	// multi writer
	file2,err2 := os.Create("output/multiwriter.txt")
	if err2 != nil {
		panic(err2)
	}
	writer := io.MultiWriter(file2, os.Stdout, os.Stdout)
	io.WriteString(writer, "io.MultiWriter example\n")

	// gzip
	file3,err3 := os.Create("output/gziptest.txt.gz")
	if err3 != nil {
		panic(err3)
	}
	writer3 := gzip.NewWriter(file3)
	writer3.Header.Name = "gziptest.txt"
	writer3.Write([]byte("gzip.Writer example\n"))
	writer3.Close()

	// buffer
	buffer4 := bufio.NewWriter(os.Stdout)
	buffer4.WriteString("bufio.Writer\n")
	buffer4.Flush()
	buffer4.WriteString("bufio.Writer example\n")
	buffer4.Flush()

	fmt.Fprintf(os.Stdout, "Write with os.Stdout at %v\n", time.Now())
	fmt.Fprintf(os.Stdout, "Write with os.Stdout at %v\n", "aaa")
	fmt.Fprintf(os.Stdout, "Write with os.Stdout at %v\n", 12)

	// HTTP HEADER
	http_request, err := http.NewRequest("GET", "http://ascii.jp", nil)
	http_request.Header.Set("X-TEST","HTTPヘッダを追加するtest")
	http_request.Write(os.Stdout)


	// goroutine
	// @link http://ascii.jp/elem/000/001/475/1475360/
	fmt.Println("start sub()")
	go sub_task()
	fmt.Println("end sub()")

	go func() {
		fmt.Println("closure run")
		time.Sleep(time.Second * 1)
		fmt.Println("closure finish")
	}()
	time.Sleep(time.Second * 3)

	go sub_task1(2)
	c := 11
	go func(){
		fmt.Println("share by capture", c*c)
	}()
	string_tasks := []string{
		"cmake ..",
		"cmake . --build Release",
		"cpack",
		"cpack1",
		"cpack2",
		"cpack3",
		"cpack4",
		"cpack5",
	}
	for _, string_task := range string_tasks {
		go sub_task2(string_task)
		go func() {
			// goroutineが起動するときにはループが回りきって
			// 全部のtaskが最後のタスクになってしまう
			fmt.Println(string_task)
		}()
	}
	time.Sleep(time.Second * 3)

	// channel
	mychannel_tasks := make(chan string)
	go func(){
		mychannel_tasks <- "T"
	}()
	mychannel_task := <- mychannel_tasks

	mychannel_tasks2 := make(chan string, 10)
	go func(){
		mychannel_tasks2 <- "F"
	}()
	mychannel_task2, mychannel_task2_ok := <- mychannel_tasks2

	fmt.Println(mychannel_task,mychannel_task2,mychannel_task2_ok)

	mychannel_task3 := make(chan bool)
	go func(){
		time.Sleep(time.Second * 1)
		fmt.Println( "mychannel_task3")
		time.Sleep(time.Second * 1)
		mychannel_task3 <- true
	}()
	<-mychannel_task3
	fmt.Println("after mychannel_task3")

	// channel with context/cancel
	ctx, cancel := context.WithCancel(context.Background())
	go func(){
		time.Sleep(time.Second * 1)
		fmt.Println("context test")
		time.Sleep(time.Second * 1)
		cancel()
	}()
	<-ctx.Done()
	fmt.Println("context Done!")

	// select
	// @link https://ryochack.hatenablog.com/entry/2013/08/08/184141
	myselect_ch1, myselect_done1 := select_fn("tea",5)
	myselect_ch2, myselect_done2 := select_fn("coffee",3)
	myselect_ch3, myselect_done3 := select_fn("rice",2)

	myselect_count := 0
	SELECT_LABEL:
	for {
		select {
			case msg := <- myselect_ch1:
				fmt.Println(msg)
			case msg := <- myselect_ch2:
				fmt.Println(msg)
			case msg := <- myselect_ch3:
				fmt.Println(msg)
			case <- myselect_done1:
				myselect_count++
			case <- myselect_done2:
				myselect_count++
			case <- myselect_done3:
				myselect_count++
		}
		if ( myselect_count > 0 ) {
			break SELECT_LABEL
		}
	}
	fmt.Println("select finished")

	// Select(sync)
	fmt.Println("select1 start!")
	myselect2_ch1 := select_fn2("2beer",4)
	myselect2_ch2 := select_fn2("2juice",3)
	myselect2_ch3 := select_fn2("2water",2)
	var wg sync.WaitGroup
	reporter := func(ch chan string){
		defer wg.Done()
		for str := range ch {
			fmt.Println(str)
		}
	}
	wg.Add(3)
	go reporter(myselect2_ch1)
	go reporter(myselect2_ch2)
	go reporter(myselect2_ch3)
	wg.Wait()
	fmt.Println("select2 finish!")

	// Select2(sync)
	select3_wg.Add(3)
	myselect3_ch1 := select_fn3("3beer",4)
	myselect3_ch2 := select_fn3("3juice",3)
	myselect3_ch3 := select_fn3("3water",2)
	done := make(chan bool)
	go func() {
		select3_wg.Wait()
		done <- true
	}()
	SELECT_LABEL3:
	for {
		select {
		case str := <-myselect3_ch1:
			fmt.Println(str)
		case str := <-myselect3_ch2:
			fmt.Println(str)
		case str := <-myselect3_ch3:
			fmt.Println(str)
		case <-done:
			break SELECT_LABEL3
		}
	}
	fmt.Println("myselect3 Finished!")


}


//func handler( w http.ResponseWriter, r *http.Request)  {
//	w.Write([]byte("http.ResponseWriter sample\n"))
//}

func sub_task()  {
	fmt.Println("running sub()")
	time.Sleep(time.Second * 2)
	fmt.Println("finished sub()")
}

func sub_task1(c int){
	fmt.Println("share by argument", c*c)
}
func sub_task2(v string){
	fmt.Println("share by argument", v)
}

func select_fn(str string, n int) ( chan string, chan bool ) {
	ch := make(chan string)
	done := make(chan bool)
	go func(){
		for i:=0; i<n; i++ {
			time.Sleep(time.Second * 1)
			ch <- str + " please!"
		}
		done <- true
	}()
	return ch, done
}

func select_fn2(str string, n int) (chan string){
	ch := make(chan string)
	go func() {
		for i:=0; i<n; i++  {
			time.Sleep(time.Second * 1)
			ch <- str + " please!"
		}
		close(ch)
	}()
	return ch
}

var select3_wg sync.WaitGroup
func select_fn3(str string, n int) (chan string)  {
	ch := make(chan string)
	go func() {
		for i:=0; i<n; i++  {
			ch <- str + " please!"
		}
		select3_wg.Done()
	}()
	return ch

}