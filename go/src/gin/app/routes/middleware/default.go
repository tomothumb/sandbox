package middleware

import (
	"github.com/gin-gonic/gin"
)

func DefaultMiddleware(router *gin.Engine) *gin.Engine {
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	return router
}