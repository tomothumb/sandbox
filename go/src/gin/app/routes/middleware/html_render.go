package middleware

import (
	"github.com/gin-gonic/gin"
	"html/template"
	"app/utils/html_filters"
)

func HtmlRenderMiddleware(router *gin.Engine) *gin.Engine {
	router.SetFuncMap(template.FuncMap{
		"StrToUpper": html_filters.StrToUpper,
		"StrToLower": html_filters.StrToLower,
		"FormatAsDate": html_filters.FormatAsDate,
	})
	router.LoadHTMLGlob("views/**/*")
	return router
}