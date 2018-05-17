package main

import (
	"fmt"
	"log"
	"net/http"
	"github.com/PuerkitoBio/goquery"
)

func main() {
	Scrape()
}

func Scrape()  {
	res, err := http.Get("http://metalsucks.net")
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

	doc.Find(".sidebar-reviews article .content-block").Each(func(i int, s *goquery.Selection){
		band := s.Find("a").Text()
		title := s.Find("i").Text()
		fmt.Printf("Review %d: %s - %s\n", i, band, title)
	})
}
