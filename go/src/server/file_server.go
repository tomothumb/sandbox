package main

import (
	"fmt"
	"math/rand"
	"net/http"
)

func main()  {
	fs := http.FileServer(http.Dir("www"))
	http.Handle("/", fs)
	http.HandleFunc("/dice", DiceHandler)
	http.ListenAndServe(":8888", nil)
}

func DiceHandler(w http.ResponseWriter, r *http.Request){
	v := rand.Intn(6) +1
	s := fmt.Sprintf("サイコロの目は、%d", v)
	w.Write([]byte(s))
}