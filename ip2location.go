package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"github.com/ip2location/ip2location-go"
)

type IPAddresses struct {
	Address string `json:"IP"`
}

type CountryInfo struct {
	City string
	Country_long string
	Longitude float32
	Latitude float32
}

func main() {
	//open port
	//html file
	//ask for the addresslist json 
	var arr []CountryInfo

	db, err := ip2location.OpenDB("./IP2LOCATION-LITE-DB11.BIN")
	if err != nil {
		fmt.Print(err)
		return
	}

	// content, err := ioutil.ReadFile("test.json")
	content, err := ioutil.ReadFile("addresslist.json")
	if err != nil {
		fmt.Println(err.Error())
	}

	var List []IPAddresses
	err2 := json.Unmarshal(content, &List)
	if err2 != nil {
		fmt.Println("Error JSON Unmarshalling")
		fmt.Println(err2.Error())
	}
	
	for _, x := range List {
		results, err := db.Get_all(x.Address)

		if err != nil {
			fmt.Print(err)
			return
		}
		//fmt.Printf("%s: %s, %s [Longitude: %f] [Latitude %f]\n", x.Address, results.City, results.Country_long, results.Longitude, results.Latitude)

		data := CountryInfo {
			City: results.City,
			Country_long: results.Country_long,
			Longitude: results.Longitude,
			Latitude: results.Latitude,
		}

		arr = append(arr,data)

	}
	
	file, _ := json.MarshalIndent(arr,"", " ")

		_ = ioutil.WriteFile("locations.json",file, 0644)
}
