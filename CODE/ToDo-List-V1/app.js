const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

let items = [];

var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

app.get('/day', (req, res) => {
    var today = new Date();
    var cd = '', work = '';
    var daystr = today.toLocaleDateString('en-US', options);
    if (today.getDay() === 0 || today.getDay() === 6) {
        cd = 'Weekend';
        work = 'Enjoy';
    }
    else {
        cd = 'Weekday';
        work = 'Work';
    }
    res.render('listday', {
        daytype: cd,
        daywork: work,
        dayno: today.getDay(),
        dystr: daystr,
    });
});




app.get('/', (req, res) => {
    res.render('index', {itemsh: items});
});

app.post('/', (req, res) => {
    items.push(req.body.newItem);
    //console.log(items);
    //res.render('index', {itemsh: items});
    res.redirect('/');
});







app.listen(8000, () => {
    console.log('server started on port 8000');
});