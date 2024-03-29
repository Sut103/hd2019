package controller

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"google.golang.org/api/iterator"
	"googlemaps.github.io/maps"
)

func (ct *Controller) GetMessage(c *gin.Context) {
	_, err := validateRequest(c, ct)
	if err != nil {
		c.String(http.StatusUnauthorized, "Unauthorized", nil)
		return
	}

	id := c.Param("id")

	client := ct.Firestore.Client
	ctx := ct.Firestore.Ctx

	dsnap, err := client.Collection("message").Doc(id).Get(ctx)
	if err != nil {
		panic(err)
	}

	message := Message{}
	dsnap.DataTo(&message)

	c.JSON(http.StatusOK, message)
}

type RequestGetMessages struct {
	ID string `form:"series_id"`
}

type ResponseGetMessages struct {
	ID     string `json:"id"`
	Latlng Latlng `json:"latlng"`
}

func (ct *Controller) GetMessages(c *gin.Context) {
	_, err := validateRequest(c, ct)
	if err != nil {
		c.String(http.StatusUnauthorized, "Unauthorized", nil)
		return
	}

	//リクエストバインド
	req := RequestGetMessages{}
	ress := []ResponseGetMessages{}
	c.ShouldBindQuery(&req)
	if req.ID == "" {
		c.String(http.StatusBadRequest, "bad request", nil)
		return
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

type RequestPostMessage struct {
	Title      string `json:"title"`
	Body       string `json:"body"`
	SeriesID   string `json:"series_id"`
	SeriesName string `json:"series_name"`
	Latlng     Latlng `json:"latlng"`
}

func (ct *Controller) PostMessages(c *gin.Context) {
	client := ct.Firestore.Client
	ctx := ct.Firestore.Ctx
	req := RequestPostMessage{}
	c.ShouldBindJSON(&req)

	userUUID, err := validateRequest(c, ct)
	if err != nil {
		c.String(http.StatusUnauthorized, "Unauthorized", nil)
		return
	}

	//series_uuid入手
	seriesID := ""
	if req.SeriesID != "" {
		seriesID = req.SeriesID
	} else {
		series := Series{
			Name:     req.SeriesName,
			UserUUID: userUUID,
		}
		//series作成
		ref := client.Collection("series").NewDoc()
		_, err := ref.Set(ctx, series)
		if err != nil {
			panic(err)
		}
		seriesID = ref.ID
	}

	addr, err := getAddressHere(req.Latlng.Lat, req.Latlng.Lng, ct.Config.GCPAPIKEY)
	if err != nil {
		c.String(http.StatusInternalServerError, "internal server error : geocode", nil)
	}

	//追加メッセージ作成
	message := Message{
		Address: addr, //TODO
		Body:    req.Body,
		Date:    time.Now(),
		Latlng: Latlng{
			Lat: req.Latlng.Lat,
			Lng: req.Latlng.Lng,
		},
		Series_UUID: seriesID, //TODO
		Title:       req.Title,
		User_UUID:   userUUID,
		Views:       0,
		Weather:     "unknown",
	}

	//メッセージ追加
	_, _, err = client.Collection("message").Add(ctx, message)
	if err != nil {
		panic(err)
	}
}
func (ct *Controller) PutMessages(c *gin.Context) {

}
func (ct *Controller) DeleteMessages(c *gin.Context) {

}

func getAddressHere(lat float64, lng float64, key string) (string, error) {
	c, err := maps.NewClient(maps.WithAPIKey(key))
	if err != nil {
		return "", nil
	}
	r := &maps.GeocodingRequest{
		LatLng: &maps.LatLng{
			Lat: lat,
			Lng: lng,
		},
		Language: "ja",
	}
	route, err := c.Geocode(context.Background(), r)
	if err != nil {
		return "", nil
	}

	if len(route) != 0 {
		return route[0].FormattedAddress, nil
	}
	return "", nil
}
