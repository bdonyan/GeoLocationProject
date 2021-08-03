package main

import (
	"encoding/json"
	"io/ioutil"
	"math/rand"
	"strconv"
)

type IPAddresses struct {
	Address string `json:"IP"`
}

func main() {
	var arr []IPAddresses
	var numbers [4]int

	for i := 1; i <= 1000; i++ {
		var status bool = false
		for status == false {
			for j :=0; j<4; j++ {
				numbers[j] = rand.Intn(255)
			}
			if numbers[0] == 10 {
				continue
			} else if numbers[0] == 172 {
				if numbers[1] >= 16 && numbers[1] <= 255 {
					continue
				} else {
					status = true
				}
			} else if numbers[0] == 192 {
				if numbers[1] == 168 {
					continue
				} else {
					status = true
				}
			} else if numbers[0] == 100 {
				if numbers[1] >= 64 && numbers[1] <= 127 {
					continue
				} else {
					status = true
				}
			}
		}
		address := strconv.Itoa(numbers[0]) + "." + strconv.Itoa(numbers[1]) + "." + strconv.Itoa(numbers[2]) + "." + strconv.Itoa(numbers[3])

		data := IPAddresses{
			Address: address,
		}

		arr = append(arr, data)
	}

	//fmt.Print(arr)
	file, _ := json.MarshalIndent(arr, "", " ")
	_ = ioutil.WriteFile("addresslist.json", file, 0644)
}
