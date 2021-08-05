# GeoLocationProject

This project allows the user to plot points on a map of a JSON input file of IP Addresses. There is GoLang code in the project which allows the user to randomly generate a JSON file for input into the map plotting section (using the time as a rand seed). The JSON information is converted into Langitude and Longitude using a database which can get the information such as City, Country, or Lat/Long of the IP Addresses. This information is sent as a JSON file to Javascript code which plots the points in different colors based on population density on a Google Map, using the Google Maps Javascript API. The project is organized in 3 different pages on a website: one as a desciption page, another as a download link for an input file, and another to plot the IP Addresses on the map. A navigation bar on the top allows the user to switch between the 3 pages.

![image](https://user-images.githubusercontent.com/66976326/128273743-52227f14-3f21-4b06-981c-779499e6732f.png)

![image](https://user-images.githubusercontent.com/66976326/128273760-72a6b038-ad74-4c0d-b5dc-363094caccc2.png)

![image](https://user-images.githubusercontent.com/66976326/128273785-f5bff8bb-f18f-4af1-83d2-3fb0e846eeb4.png)

