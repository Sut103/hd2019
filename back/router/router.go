package router

import (
	"context"
	"hd2019/back/controller"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/option"
)

func GetRoute() (*gin.Engine, error) {
	r := gin.Default()

	//firestore
	dbClient, authClient, ctx, err := initFirebase()
	if err != nil {
		return nil, err
	}
	//defer client.Close()

	//firebase Auth

	//Controller
	ct := controller.GetController()
	ct.Firestore = controller.Firestore{
		Client: dbClient,
		Ctx:    ctx,
	}

	ct.FireAuth = controller.FireAuth{
		Client: authClient,
		Ctx:    ctx,
	}

	//CORS
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"*"}
	r.Use(cors.New(corsConfig))

	//Route
	r.GET("/serch", ct.GetSerch)
	r.GET("/series", ct.GetSeries)
	r.GET("/messages", ct.GetMessages)
	r.GET("/messages/:id", ct.GetMessage)
	r.POST("/messages", ct.GetMessages)
	r.PUT("/messages/:id", ct.PutMessages)
	r.DELETE("/series/:id", ct.DeleteteSeries)
	r.DELETE("/messages/:id", ct.DeleteMessages)

	return r, nil
}

func initFirebase() (*firestore.Client, *auth.Client, context.Context, error) {
	ctx := context.Background()
	sa := option.WithCredentialsFile("sa.json")
	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		return nil, nil, nil, err
	}

	dbClient, err := app.Firestore(ctx)
	if err != nil {
		return nil, nil, nil, err
	}

	authClient, err := app.Auth(ctx)
	if err != nil {
		return nil, nil, nil, err
	}

	return dbClient, authClient, ctx, nil
}
