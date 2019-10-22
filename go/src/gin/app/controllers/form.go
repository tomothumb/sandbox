package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

func GetForm(c *gin.Context) {
	c.HTML(http.StatusOK, "form/form.html", gin.H{
		"name": "Foo Bar",
	})
}

func GetFormNew(c *gin.Context) {
	c.HTML(http.StatusOK, "form/new.html", gin.H{
		"name": "Foo Bar",
		"now": time.Date(2017, 07, 01, 0, 0, 0, 0, time.UTC),
	})
}
