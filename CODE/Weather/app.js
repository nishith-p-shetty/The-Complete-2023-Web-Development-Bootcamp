const bodyParser = require('body-parser');
const express = require('express');
const app =  express();
const https = require('https');
const port =  3000;
const path = require('path');
const endpoint = 'https://api.openweathermap.org/data/2.5/weather?q=';
const params = '&units=metric&appid=';
const apikey = '7b20c89ecb33037c66977b01cc8b40cf';

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.post("/", (req, res) => {



    const url = endpoint + req.body.cityName + params + apikey;
    https.get(url, (wthrRes) => {
        if(wthrRes.statusCode === 200){
            wthrRes.on("data", (data) => {
                const wd = JSON.parse(data);
                res.write("<p>Place      : " + wd.name + "</p>");
                res.write("<p>Temprature : " + wd.main.temp + " &#8451;</p>");
                res.write("<p>Discription: " + wd.weather[0].description + "</p>");
                res.write("<p>Humidity   : " + wd.main.humidity + " %</p>");
                res.write("<p>Visibility : " + wd.visibility + "</p>");
                res.write("<p>Wind Speed : " + wd.wind.speed + " m/s</p>");
                res.write('<p><img src="https://openweathermap.org/img/wn/' + wd.weather[0].icon + '.png"></p>');

                res.send();
            });
        }
        else{
            res.send('ERROR : ' + wthrRes.statusCode);
        }
    });


}); 

app.listen(port, () => {
    console.log("Server started on port " + port);
});