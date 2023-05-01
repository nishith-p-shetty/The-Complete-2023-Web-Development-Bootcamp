require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
/*const md5 = require('md5');
const encrypt = require('mongoose-encryption');
const bcrypt = require('bcrypt');
const saltRounds = 10;*/
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/userDB');

const PORT = 8000;

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
//userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });


const User = new mongoose.model('User', userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id).then( function(err, user) {
        done(err, user);
    });
});


passport.use(new GoogleStrategy({
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        callbackURL: 'http://localhost:8000/auth/google/secrets',
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/secrets', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) { res.redirect('/secrets');});

app.get('/secrets', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('secrets');
    }
    else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    req.logout((err)=>{
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
});


app.route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post((req, res) => {
        /*User.findOne({ email: req.body.username })
            .then((foundUser) => {
                if (foundUser) {
                    bcrypt.compare(md5(req.body.password), foundUser.password, function(err, result) {
                        if (result === true){
                            res.render('secrets');
                        }
                        else{
                            res.redirect('/login');
                        }
                    });
                }
                else{
                    res.redirect('/register');
                }
            })
            .catch((err) => {
                res.status(500).send(err);
            });*/

            const tempUsr = new User({
                username: req.body.username,
                password: req.body.password,
            });

            req.login(tempUsr, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    passport.authenticate('local')(req, res, function () {
                        res.redirect('/secrets');
                    });
                }
            });
    });

app.route('/register')
    .get((req, res) => {
        res.render('register');
    })
    .post((req, res) => {
        /*bcrypt.hash(md5(req.body.password), saltRounds, function(err, hash) {
            const tempUsr = new User({
                email: req.body.username,
                password: hash,
            });
            tempUsr.save()
                .then((result) => {
                    res.render('secrets');
                }).catch((err) => {
                    res.status(500).send(err);
                });
        });        */

        User.register({username: req.body.username}, req.body.password, function(err, user) {
            if (err) { 
                console.log(err);
                res.redirect('/register');
            }
            else {
                res.redirect('/login');
            }
        });
    });

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});