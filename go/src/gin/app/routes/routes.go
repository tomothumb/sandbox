package routes

import (
	"github.com/gin-gonic/gin"
	"app/controllers"
)

func InitRouter() *gin.Engine {
	route := gin.Default()

	route.Use(gin.Logger())
	route.Use(gin.Recovery())

	route.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "route",
		})
	})

	route.GET("/demo", controllers.GetDemo)


	return route
}