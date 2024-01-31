// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express app
const app = express();
app.use(bodyParser.json()); // parse json data from request body
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Get all comments for a post
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Create a new comment for a post
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex'); // generate random id

    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || []; // get comments for post
    comments.push({ id: commentId, content }); // add new comment
    commentsByPostId[req.params.id] = comments; // update comments for post

    res.status(201).send(comments); // send comments
});

// Start listening on port 4001
app.listen(4001, () => {
    console.log('Listening on 4001');
});
