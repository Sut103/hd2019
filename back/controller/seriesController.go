package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"google.golang.org/api/iterator"
)

//ResponseGetSeries シリーズapiのレスポンス
type ResponseGetSeries struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

//GetSeries シリーズ取得api
func (ct *Controller) GetSeries(c *gin.Context) {
	ress := []ResponseGetSeries{}
	userUUID, err := validateRequest(c, ct)
	if err != nil {
		c.String(http.StatusUnauthorized, "Unauthorized", nil)
		return
	}

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
			c.String(http.StatusInternalServerError, "InternalServerError", nil)
		}

		series := Series{}
		err = doc.DataTo(&series)
		if err != nil {
			c.String(http.StatusInternalServerError, "InternalServerError", nil)
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
