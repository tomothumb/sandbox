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
			"body": "root222",
		})
	})

	route.GET("/demo", controllers.GetDemo)
	route.GET("/demo/:name", controllers.GetDemoName)
	route.GET("/demo/:name/*action", controllers.GetDemoNameAction)
	route.GET("/query", controllers.GetQuery)
	route.POST("/post/sample", controllers.PostSample)
	route.POST("/post/sample_complex", controllers.PostComplexSample)


	return route
}