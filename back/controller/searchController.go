package controller

import (
	"context"
	"fmt"

	"github.com/gin-gonic/gin"
)

func (ct *Controller) GetSearch(c *gin.Context) {
	t, err := ct.FireAuth.Client.VerifyIDToken(context.Background(), "a")
	fmt.Println(t, err)
}
