package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"google.golang.org/api/iterator"
)

func (ct *Controller) GetMessage(c *gin.Context) {

}

type RequestGetMessages struct {
	ID string `form:"series_id"`
}

type ResponseGetMessages struct {
	ID     string `json:"id"`
	Latlng Latlng `json:"latlng"`
}

func (ct *Controller) GetMessages(c *gin.Context) {

	//リクエストバインド
	req := RequestGetMessages{}
	ress := []ResponseGetMessages{}
	c.ShouldBindQuery(&req)
	if req.ID == "" {
		c.String(http.StatusBadRequest, "bad request", nil)
	}

	//検索
	client := ct.Firestore.Client
	ctx := ct.Firestore.Ctx

	iter := client.Collection("message").Where("series_uuid", "==", req.ID).Documents(ctx)
	for {
		res := ResponseGetMessages{}
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			panic(err)
		}
		fmt.Println(doc.Data())

		message := Message{}
		err = doc.DataTo(&message)
		if err != nil {
			panic(err)
		}

		res.ID = doc.Ref.ID
		res.Latlng.Lat = message.Latlng.Lat
		res.Latlng.Lng = message.Latlng.Lng

		ress = append(ress, res)
	}

	//レスポンス
	c.JSON(http.StatusOK, ress)
}

}
func (ct *Controller) PostMessages(c *gin.Context) {

}
func (ct *Controller) PutMessages(c *gin.Context) {

}
func (ct *Controller) DeleteMessages(c *gin.Context) {

}
