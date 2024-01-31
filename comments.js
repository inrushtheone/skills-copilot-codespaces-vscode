//create web server
var express = require('express');
var app = express();
//create server
var server = require('http').createServer(app);
//create socket.io instance
var io = require('socket.io').listen(server);
//create redis client
var redis = require('redis');
//create redis client
var redisClient = redis.createClient();
//create redis subscriber
var redisSubscriber = redis.createClient();
//create redis publisher
var redisPublisher = redis.createClient();
//create redis subscriber
var redisSubscriber = r