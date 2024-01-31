//create web server
//express is the framework for node.js
//body-parser is the middleware to handle post body request
//mongoose is the middleware to connect to mongodb
//session is the middleware to handle session
//connect-mongo is the middleware to store session into mongodb
//passport is the middleware for user authentication
//passport-local is the middleware for user authentication using username and password
//multer is the middleware to handle multipart/form-data
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var fs = require('fs');
var path = require('path');

//connect to mongodb
mongoose.connect('mongodb://localhost/comments');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(callback) {
    console.log('Connection Succeeded');
});

//define comment schema
var commentSchema = mongoose.Schema({
    name: String,
    email: String,
    message: String,
    created_at: Date
});
//define comment model
var Comment = mongoose.model('Comment', commentSchema);

//define user schema
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    created_at: Date,
    updated_at: Date
});
//define user model
var User = mongoose.model('User', userSchema);

//define post schema
var postSchema = mongoose.Schema({
    title: String,
    content: String,