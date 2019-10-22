package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetDemo(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "This is Demo",
	})
}

func GetDemoName(c *gin.Context) {
	name := c.Param("name")
	c.String(http.StatusOK, "Hello %s", name)
}

func GetDemoNameAction(c *gin.Context) {
	name := c.Param("name")
	action := c.Param("action")
	message := name + " : " + action
	c.String(http.StatusOK, message)
}

// curl localhost:8080/query?q=12345\&category=sport
func GetQuery(c *gin.Context) {
	q := c.DefaultQuery("q", "__")
	category := c.Query("category")
	c.String(http.StatusOK, "SEARCH: %s ON CATEGORY: %s \n", q, category)
}

// curl -X POST localhost:8080/post/sample -d "post_name=PPOOSSTT&post_message=thisIsBodyMessage"|jq
func PostSample(c *gin.Context) {
	post_name := c.DefaultPostForm("post_name", "anonymous")
	post_message := c.PostForm("post_message")

	c.JSON(http.StatusOK, gin.H{
		"status": "posted",
		"message": post_message,
		"name": post_name,
	})
}

// curl --globoff -X POST localhost:8080/post/sample_complex?ids[a]=1234\&ids[b]=hello -d "names[first]=thinkerou&names[second]=tianou" | jq
func PostComplexSample(c *gin.Context) {

	ids := c.QueryMap("ids")
	names := c.PostFormMap("names")

	c.JSON(http.StatusOK, gin.H{
		"status": "posted",
		"ids": ids,
		"names": names,
	})
}
