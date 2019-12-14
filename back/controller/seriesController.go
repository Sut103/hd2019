package controller

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"google.golang.org/api/iterator"
)

type ResponseGetSeries struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func (ct *Controller) GetSeries(c *gin.Context) {
	ress := []ResponseGetSeries{}

	auth := c.Request.Header.Get("authorization")
	t, err := ct.FireAuth.Client.VerifyIDToken(context.Background(), auth)
	// fmt.Println(t, err)
	if err != nil {
		fmt.Print(err)
	}

	user_uuid := t

	client := ct.Firestore.Client
	ctx := ct.Firestore.Ctx

	iter := client.Collection("series").Where("user_uuid", "==", user_uuid).Documents(ctx)
	for {
		res := ResponseGetSeries{}
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			log.Fatalf("Failed to iterate: %v", err)
		}

		series := Series{}
		err = doc.DataTo(&series)
		if err != nil {
			panic(err)
		}
		res.ID = doc.Ref.ID
		res.Name = series.Name

		ress = append(ress, res)
	}

	//レスポンス
	c.JSON(http.StatusOK, ress)

}

func (ct *Controller) DeleteteSeries(c *gin.Context) {
	auth := c.Request.Header.Get("authorization")
	t, err := ct.FireAuth.Client.VerifyIDToken(context.Background(), auth)
	fmt.Println(t, err)
}
