package router

import (
	"hd2019/back/controller"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func GetRoute() *gin.Engine {
	r := gin.Default()

	//Controller
	ct := controller.GetController()

	//CORS
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"*"}
	r.Use(cors.New(corsConfig))

	//Route
	r.GET("/serch", ct.GetSerch)
	r.GET("/series", ct.GetSeries)
	r.GET("/messages", ct.GetMessages)
	r.GET("/messages/:id", ct.GetMessage)
	r.POST("/messages", ct.GetMessages)
	r.PUT("/messages/:id", ct.PutMessages)
	r.DELETE("/series/:id", ct.DeleteteSeries)
	r.DELETE("/messages/:id", ct.DeleteMessages)

	return r
}
