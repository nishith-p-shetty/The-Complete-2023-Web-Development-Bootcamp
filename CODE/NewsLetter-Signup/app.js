const bodyParser = require('body-parser');
const request = require('request');
const express = require('express');
const app = express();
const port =  3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/',  (req, res) => {
    res.send(req.body);
});

app.listen(port, () => {
    console.log("Server started on port " + port);
});