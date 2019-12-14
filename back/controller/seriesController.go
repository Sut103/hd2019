package controller

import (
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
	userUUID := validateRequest(c, ct)

	client := ct.Firestore.Client
	ctx := ct.Firestore.Ctx

	iter := client.Collection("series").Where("user_uuid", "==", userUUID).Documents(ctx)
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

}
