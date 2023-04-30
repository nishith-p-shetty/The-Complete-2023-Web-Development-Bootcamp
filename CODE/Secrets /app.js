require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/userDB');

const PORT = 8000;

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });


const User = new mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    res.render('home');
});


app.route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post((req, res) => {
        User.findOne({ email: req.body.username })
            .then((foundUser) => {
                if (foundUser) {
                    if (foundUser.password === req.body.password){
                        res.render('secrets');
                    }
                    else{
                        res.redirect('/login');
                    }
                }
                else{
                    res.redirect('/register');
                }
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    });

app.route('/register')
    .get((req, res) => {
        res.render('register');
    })
    .post((req, res) => {
        const tempUsr = new User({
            email: req.body.username,
            password: req.body.password,
        });
        tempUsr.save()
            .then((result) => {
                res.render('secrets');
            }).catch((err) => {
                res.status(500).send(err);
            });
    });

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});