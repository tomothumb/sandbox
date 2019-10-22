package middleware

import (
	"github.com/gin-gonic/gin"
)

func InitMiddleware(router *gin.Engine) *gin.Engine {
	router = DefaultMiddleware(router)
	router = HtmlRenderMiddleware(router)

	return router
}