package controller

import "github.com/gin-gonic/gin"

type ResponseGetSeries struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func (ct *Controller) GetSeries(c *gin.Context) {

}

func (ct *Controller) DeleteteSeries(c *gin.Context) {

}
