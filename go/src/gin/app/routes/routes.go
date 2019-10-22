package routes

import (
	"github.com/gin-gonic/gin"
	"app/controllers"
	"app/routes/middleware"
)

func InitRouter() *gin.Engine {
	router := gin.New()
	middleware.InitMiddleware(router)


	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "route",
			"body": "root222",
		})
	})

	demoRoute := router.Group("/demo")
	{
		demoRoute.GET("", controllers.GetDemo)
		demoRoute.GET("/:name", controllers.GetDemoName)
		demoRoute.GET("/:name/*action", controllers.GetDemoNameAction)
	}
	router.GET("/query", controllers.GetQuery)

	postRoute := router.Group("/post")
	{
		postRoute.POST("/sample", controllers.PostSample)
		postRoute.POST("/sample_complex", controllers.PostComplexSample)
	}
	formRoute := router.Group("/form")
	{
		formRoute.GET("", controllers.GetForm)
	}
	return router
}