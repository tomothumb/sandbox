package main

import (
	"fmt"
	"log"
	"net/http"
	"github.com/PuerkitoBio/goquery"
)

func main() {
	url := "http://metalsucks.net"
	Scrape(url)
	url2 := "https://newspicks.com/"
	Scrape2(url2)
}

func Scrape(url string) {
	res, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()
	if res.StatusCode != 200 {
		log.Fatalf("ERROR: %d %s", res.StatusCode, res.Status)
	}
	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		log.Fatal(err)
	}
	doc.Find(".sidebar-reviews article .content-block").Each(func(i int, s *goquery.Selection) {
		band := s.Find("a").Text()
		title := s.Find("i").Text()
		fmt.Printf("Review %d: %s - %s\n", i, band, title)
	})
}

func Scrape2(url string) {
	res, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()
	if res.StatusCode != 200 {
		log.Fatalf("ERROR: %d %s", res.StatusCode, res.Status)
	}
	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		log.Fatal(err)
	}
	doc.Find("meta").Each(func(i int, s *goquery.Selection) {
		op, _ := s.Attr("property")
		con, _ := s.Attr("content")
		switch op {
		case "og:title":
			fmt.Println("OG:title = " + con)
		case "og:description":
			fmt.Println("OG:description = " + con)
		case "og:url":
			fmt.Println("OG:url = " + con)
		case "og:image":
			fmt.Println("OG:image = " + con)
		}
	})

	//doc.Find("meta").Each(func(i int, s *goquery.Selection) {
	//	//band := s.Find("a").Text()
	//	//title := s.Find("i").Text()
	//	fmt.Printf("Review %d: %s - %s\n", i, s)
	//})
	//fmt.Println(doc)
}
