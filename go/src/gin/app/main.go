package main

import (
	"app/routes"
)

func main(){
	router := routes.InitRouter()
	router.Run(":8080")
}
