package controller

import (
	"context"
	"hd2019/back/config"
	"time"

	"cloud.google.com/go/firestore"
	"firebase.google.com/go/auth"
	"github.com/gin-gonic/gin"
)

type Controller struct {
	Firestore Firestore
	FireAuth  FireAuth
	Config    config.Config
}

type Firestore struct {
	Client *firestore.Client
	Ctx    context.Context
}

type FireAuth struct {
	Client *auth.Client
	Ctx    context.Context
}

type User struct {
	Name  string `firestore:"name,omitempty"`
	Token string `firestore:"token,omitempty"`
}

type Message struct {
	Address     string    `firestore:"address,omitempty"`
	Body        string    `firestore:"body,omitempty"`
	Date        time.Time `firestore:"date,omitempty"`
	Latlng      Latlng    `firestore:"latlng,omitempty"`
	Series_UUID string    `firestore:"series_uuid,omitempty"`
	Title       string    `firestore:"title,omitempty"`
	User_UUID   string    `firestore:"user_uuid,omitempty"`
	Views       int       `firestore:"views,omitempty"`
	Weather     string    `firestore:"weather,omitempty"`
}

type Latlng struct {
	Lat float64 `json:"lat" firestore:"lat,omitempty" form:"lat"`
	Lng float64 `json:"lng" firestore:"lng,omitempty" form:"lng"`
}

type Series struct {
	Name     string `firestore:"name,omitempty"`
	UserUUID string `firestore:"user_uuid,omitempty"`
}

func GetController() *Controller {
	return &Controller{}
}

func validateRequest(c *gin.Context, ct *Controller) (string, error) {
	auth := c.Request.Header.Get("authorization")
	t, err := ct.FireAuth.Client.VerifyIDToken(context.Background(), auth)
	if err != nil {
		return "", err
	}
	return t.UID, nil
}
