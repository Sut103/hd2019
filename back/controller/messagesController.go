package controller

import (
	"context"
	"fmt"

	"github.com/gin-gonic/gin"
)

func (ct *Controller) GetMessage(c *gin.Context) {
	t, err := ct.FireAuth.Client.VerifyIDToken(context.Background(), "a")
	fmt.Println(t, err)
}

type RequestGetMessages struct {
	ID string `form:"series_id"`
}

type ResponseGetMessages struct {
	ID     string `json:"id"`
	Latlng Latlng `json:"latlng"`
}

func (ct *Controller) GetMessages(c *gin.Context) {
	auth := c.Request.Header.Get("authorization")
	t, err := ct.FireAuth.Client.VerifyIDToken(context.Background(), auth)
	fmt.Println(t, err)
}
func (ct *Controller) PostMessages(c *gin.Context) {
	auth := c.Request.Header.Get("authorization")
	t, err := ct.FireAuth.Client.VerifyIDToken(context.Background(), auth)
	fmt.Println(t, err)
}
func (ct *Controller) PutMessages(c *gin.Context) {
	auth := c.Request.Header.Get("authorization")
	t, err := ct.FireAuth.Client.VerifyIDToken(context.Background(), auth)
	fmt.Println(t, err)
}
func (ct *Controller) DeleteMessages(c *gin.Context) {
	auth := c.Request.Header.Get("authorization")
	t, err := ct.FireAuth.Client.VerifyIDToken(context.Background(), auth)
	fmt.Println(t, err)
}
