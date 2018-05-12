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
	time.Sleep(time.Second * 3)

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
