package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"google.golang.org/api/iterator"
)

//ResponseGetSearch サーチapiのレスポンス
type ResponseGetSearch struct {
	ID     string `json:"id"`
	Latlng Latlng `json:"latlng"`
}

//GetSearch サーチapi
func (ct *Controller) GetSearch(c *gin.Context) {
	_, err := validateRequest(c, ct)
	if err != nil {
		c.String(http.StatusUnauthorized, "Unauthorized", nil)
		return
	}

	length := 0.001 //探索距離
	client := ct.Firestore.Client
	ctx := ct.Firestore.Ctx
	ress := []ResponseGetSearch{}
	//request
	req := Latlng{}
	err = c.ShouldBindQuery(&req)
	if err != nil {
		c.String(http.StatusBadRequest, "BadRequest", nil)
	}

	//lat search
	iter := client.Collection("message").Where("latlng.lat", "<", req.Lat+length).Where("latlng.lat", ">", req.Lat-length).Documents(ctx)
	for {
		res := ResponseGetSearch{}
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			c.String(http.StatusInternalServerError, "InternalServerError", nil)
		}

		message := Message{}
		err = doc.DataTo(&message)
		if err != nil {
			c.String(http.StatusInternalServerError, "InternalServerError", nil)
		}

		if !(message.Latlng.Lng < req.Lng+length && message.Latlng.Lng > req.Lng-length) {
			continue
		}

		res.ID = doc.Ref.ID
		res.Latlng.Lat = message.Latlng.Lat
		res.Latlng.Lng = message.Latlng.Lng

		ress = append(ress, res)
	}

	c.JSON(http.StatusOK, ress)
}
