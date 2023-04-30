const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const port = 8000;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);


app.get('/', (req, res) => {
    res.send("hi");
});


///////all//////

app.route('/articles')
    .get((req, res) => {
        Article.find({}).then((foundArticles) => {
            if(foundArticles.length === 0){
                res.send('No Articles');
            }
            res.send(foundArticles);
        }).catch((err) => {
            res.send(err);
        });
    })
    .post((req, res) => {
        const tempArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        tempArticle.save().then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        });
    })
    .delete((req, res) => {
        Article.deleteMany({})
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
    });
///////all//////



////////specific/////////
app.route('/articles/:articleTitle')
    .get((req, res) => {
        Article.find({title : req.params.articleTitle }).then((foundArticles) => {
            if(foundArticles.length === 0){
                res.send('No Articles');
            }
            res.send(foundArticles);
        }).catch((err) => {
            res.send(err);
        });
    })
    .put((req, res) => {
        Article.findOneAndUpdate(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
            {overwrite: true}
            )
            .then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
    })
    .patch((req, res) => {
        Article.updateOne(
            { title: req.params.articleTitle },
            { $set: req.body }
            )
            .then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
    })
    .delete((req, res) => {
        Article.deleteOne({title: req.params.articleTitle})
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
    });

////////specific/////////



app.listen(port, function () {
    console.log("Server started on port " + port);
});