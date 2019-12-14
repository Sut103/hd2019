package controller

import (
	"context"
	"fmt"

	"github.com/gin-gonic/gin"
)

func (ct *Controller) GetSeries(c *gin.Context) {
	auth := c.Request.Header.Get("authorization")
	t, err := ct.FireAuth.Client.VerifyIDToken(context.Background(), auth)
	fmt.Println(t, err)
}

func (ct *Controller) DeleteteSeries(c *gin.Context) {
	auth := c.Request.Header.Get("authorization")
	t, err := ct.FireAuth.Client.VerifyIDToken(context.Background(), auth)
	fmt.Println(t, err)
}
