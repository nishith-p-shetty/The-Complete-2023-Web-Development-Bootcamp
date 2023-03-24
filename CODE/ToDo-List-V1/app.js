const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

let items = [];
let work = [];

app.get('/day', (req, res) => {
    let td = date();
    res.render('listday', {
        dystr: td,
    });
});




app.get('/', (req, res) => {
    res.render('index', {listTitle: "Todo List", itemsh: items});
});

app.get('/work', (req, res) => {
    res.render('index', {listTitle: "Work List", itemsh: work});
});

app.post('/', (req, res) => {
    if (req.body.button === "Work List")
    {
        work.push(req.body.newItem);
        res.redirect('/work');
    }
    else{
        items.push(req.body.newItem);
        res.redirect('/');
    }
});

app.get('/about', (req, res) => {
    res.render('about', {listTitle: "About"});
});



app.listen(8000, () => {
    console.log('server started on port 8000');
});