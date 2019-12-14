package main

import "hd2019/back/router"

func main() {
	r, err := router.GetRoute()
	if err != nil {
		panic(err)
	}
	if err := r.Run(); err != nil {
		panic(err)
	}
}
