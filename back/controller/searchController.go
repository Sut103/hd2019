package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"google.golang.org/api/iterator"
)

type ResponseGetSearch struct {
	ID     string `json:"id"`
	Latlng Latlng `json:"latlng"`
}

func (ct *Controller) GetSearch(c *gin.Context) {
	length := 0.001
	client := ct.Firestore.Client
	ctx := ct.Firestore.Ctx
	ress := []ResponseGetSearch{}
	//request
	req := Latlng{}
	c.ShouldBindQuery(&req)
	//lat search
	iter := client.Collection("message").Where("latlng.lat", "<", req.Lat+length).Where("latlng.lat", ">", req.Lat-length).Documents(ctx)
	for {
		res := ResponseGetSearch{}
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			panic(err)
		}

		message := Message{}
		err = doc.DataTo(&message)
		if err != nil {
			panic(err)
		}

		if !(message.Latlng.Lng < req.Lng+length && message.Latlng.Lng > req.Lng-length) {
			continue
		}

		res.ID = doc.Ref.ID
		res.Latlng.Lat = message.Latlng.Lat
		res.Latlng.Lng = message.Latlng.Lng

		ress = append(ress, res)
		fmt.Println(message)
	}

	c.JSON(http.StatusOK, ress)
}
