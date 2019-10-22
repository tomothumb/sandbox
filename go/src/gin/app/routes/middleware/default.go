package middleware

import (
	"github.com/gin-gonic/gin"
)

func InitMiddleware(router *gin.Engine) *gin.Engine {
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	return router
}