package main

import "hd2019/back/router"

func main() {
	r := router.GetRoute()
	if err := r.Run(); err != nil {
		panic(err)
	}
}
