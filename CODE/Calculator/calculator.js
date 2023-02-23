const express  = require('express');
const app =  express();
const bodyparser = require('body-parser');
const port = 3000;

app.use(bodyparser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    res.send("Result = " + (Number(req.body.num1) + Number(req.body.num2)));
});

app.get('/bmicalculator', (req, res) => {
    res.sendFile(__dirname + '/bmiCalculator.html');
});

app.post('/bmicalculator', (req, res) => {
    res.send("BMI = " + (Number(req.body.weight) / (Number(req.body.height) * Number(req.body.height))));
});


app.listen(port, () =>  {
    console.log("Server running on port " + port);
});