

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

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
}


const Article = mongoose.model("Article", articleSchema);


///////////////////////////////////Requests Targetting all Articles////////////////////////

//  Get all articles:

app.get("/article", (req, res) => {
    Article.find().then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
    });
});

//  Posting articles:

app.post("/article", (req, res) => {
    const article1 = new Article({
        title: req.body.title,
        content: req.body.content
    });

    article1.save().then(() => {
        console.log("You have saved your data succesfully");
    }).catch((err) => {
        console.log(err);
    });
});


//  Delete all articles:

app.delete("/article", (req, res) => {

    Article.deleteMany().then(() => {
        console.log("You have deleted all documents");
    }).catch((err) => {
        console.log(err);
    });
});


//  Chained Route:
// app.route("/article")
//     .get((req, res) => {
//         Article.find().then((data) => {
//             res.send(data);
//         }).catch((err) => {
//             console.log(err);
//         });
//     })
//     .post((req, res) => {
//         const article1 = new Article({
//             title: req.body.title,
//             content: req.body.content
//         });

//         article1.save().then(() => {
//             console.log("You have saved your data succesfully");
//         }).catch((err) => {
//             console.log(err);
//         });
//     })
//     .delete((req, res) => {

//         Article.deleteMany().then(() => {
//             console.log("You have deleted all documents");
//         }).catch((err) => {
//             console.log(err);
//         });
//     });



////////////////////////////////Requests Targetting A Specific Article////////////////////////

app.route("/article/:articleTitle")

    .get(function (req, res) {

        Article.findOne({ title: req.params.articleTitle }).then((data) => {
            if (!data) {
                res.send("No articles matching that title.");
            } else {
                res.send(data);
            }

        }).catch((err) => {
            console.log(err);
        });


    })
    .put(function (req, res) {

        Article.updateOne(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content }).then(() => {
                console.log("You have Updated whole document succesfuly");
            }).catch((err) => {
                console.log(err);
            });


    })

    .patch(function (req, res) {

        Article.updateOne(
            { title: req.params.articleTitle },
            { content: req.body.content }).then(() => {
                console.log("You have Updated document content succesfuly");
            }).catch((err) => {
                console.log(err);
            });


    })

    .delete(function (req, res) {

        Article.deleteOne(
            { title: req.params.articleTitle }).then(() => {
                console.log("You have deleted one article succesfully");
            }).catch((err) => {
                console.log(err);
            });

    });


// app.get("/article/:articleTitle",function (req, res) {

//             Article.findOne({ title: req.params.articleTitle }).then((data) => {
//                 if (!data) {
//                     res.send("No articles matching that title.");
//                 } else {
//                     res.send(data);
//                 }

//             }).catch((err) => {
//                 console.log(err);
//             });
// });














app.listen(3000, function () {
    console.log("Server started on port 3000");
});