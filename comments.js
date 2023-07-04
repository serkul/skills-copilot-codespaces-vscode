// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var Comment = require('./models/comment');
var Post = require('./models/post');

// Connect to the database
mongoose.connect('mongodb://localhost:27017/comment');

// Use body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set the port
var port = process.env.PORT || 8080;

// Create router
var router = express.Router();

// Middleware
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

// Home page
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// Create a comment
router.route('/comments')
    .post(function(req, res) {
        var comment = new Comment();
        comment.name = req.body.name;
        comment.comment = req.body.comment;

        comment.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Comment created!' });
        });
    })

    // Get all the comments
    .get(function(req, res) {
        Comment.find(function(err, comments) {
            if (err)
                res.send(err);

            res.json(comments);
        });
    });

// Create a post
router.