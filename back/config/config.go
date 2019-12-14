package config

import (
	"encoding/json"
	"io/ioutil"
)

type Config struct {
	GCPAPIKEY string `json:"gcp_apikey"`
	WEATHERAPIKEY string `json:"weather_apikey"`
}

func GetConfig() (Config, error) {
	config := Config{}

	file, err := ioutil.ReadFile("config/config.json")
	if err != nil {
		return config, err
	}

	if err := json.Unmarshal(file, &config); err != nil {
		return config, err
	}

	return config, nil
}
