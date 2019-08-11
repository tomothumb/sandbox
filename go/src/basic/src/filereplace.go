package main

import (
	"fmt"
	"io/ioutil"
	"path/filepath"
	"strings"
)

//https://news.mynavi.jp/article/gogogo-2/

func main()  {
	fmt.Println("START")
	files, _ := filepath.Glob("*.txt")

	for i, name := range files{
		fmt.Println(i,"=",name)
	}

	for _, filename := range files {
		fileReplace(filename, "before", "after")
	}
}

func fileReplace(filename string, before_str string, after_str string) {
	bytes, _ := ioutil.ReadFile(filename)

	lines := strings.Replace(string(bytes), before_str, after_str, -1)
	result := []byte(lines)
	ioutil.WriteFile(filename, []byte(result), 0666)
	fmt.Println("OK:", filename)

	//tp := strings.Replace("abcde", "bcd", "ccc", -1)
	//fmt.Println("TP:",tp)
}

