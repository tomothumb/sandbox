package controllers

import (
	"github.com/gin-gonic/gin"
)

func GetDemo(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "This is Demo",
	})
}