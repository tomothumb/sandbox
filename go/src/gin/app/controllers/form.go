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
