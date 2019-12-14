package controller

import (
	"context"

	"cloud.google.com/go/firestore"
)

type Controller struct {
	Firestore Firestore
}

type Firestore struct {
	Client *firestore.Client
	Ctx    context.Context
}

func GetController() *Controller {
	return &Controller{}
}
