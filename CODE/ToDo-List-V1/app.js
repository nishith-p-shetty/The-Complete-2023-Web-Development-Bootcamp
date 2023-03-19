const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

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
    res.render('list', {
        daytype: cd,
        daywork: work,
        dayno: today.getDay(),
        dystr: daystr,
    });
});

app.get('/', (req, res) => {
    res.send('/');
})


app.listen(8000, () => {
    console.log('server started on port 8000');
});