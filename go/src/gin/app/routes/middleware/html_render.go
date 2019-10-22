package middleware

import (
	"github.com/gin-gonic/gin"
	"html/template"
)

func HtmlRenderMiddleware(router *gin.Engine) *gin.Engine {
	router.LoadHTMLGlob("views/**/*")
	return router
}