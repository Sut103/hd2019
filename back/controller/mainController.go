package controller

import (
	"context"

	"cloud.google.com/go/firestore"
	"google.golang.org/genproto/googleapis/type/date"
)

type Controller struct {
	Firestore Firestore
}

type Firestore struct {
	Client *firestore.Client
	Ctx    context.Context
}

type User struct {
	Name  string `firestore:"name,omitempty"`
	Token string `firestore:"token,omitempty"`
}

type Message struct {
	Address     string    `firestore:"address,omitempty"`
	Body        string    `firestore:"body,omitempty"`
	Date        date.Date `firestore:"date,omitempty"`
	Latlng      Latlng    `firestore:"latlng,omitempty"`
	Series_UUID string    `firestore:"series_uuid,omitempty"`
	Title       string    `firestore:"title,omitempty"`
	User_UUID   string    `firestore:"user_uuid,omitempty"`
	Views       int       `firestore:"views,omitempty"`
	Weather     string    `firestore:"weather,omitempty"`
}

type Latlng struct {
	Lat float64 `json:"lat" firestore:"lat,omitempty"`
	Lng float64 `json:"lng" firestore:"lng,omitempty`
}

type Series struct {
	Name     string `firestore:"name,omitempty"`
	UserUUID string `firestore:"user_uuid,omitempty"`
}

func GetController() *Controller {
	return &Controller{}
}
