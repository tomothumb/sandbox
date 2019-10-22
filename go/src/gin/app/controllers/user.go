package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// binding validator
// @see: https://github.com/go-playground/validator
type Person struct {
	UserId string `uri:"id" binding:"required,uuid"`
	FullName string `uri:"name" binding:"required"`
}

func GetUser(c *gin.Context) {
	var person Person
	if err := c.ShouldBindUri(&person); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"name": person.FullName,
		"uuid": person.UserId,
	})
}
