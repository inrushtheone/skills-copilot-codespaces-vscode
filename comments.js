//create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'comments'
});
connection.connect();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//get all comments
app.get('/comments', function (req, res) {
    connection.query('SELECT * FROM comments', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

//get one comment
app.get('/comments/:id', function (req, res) {
    connection.query('SELECT * FROM comments WHERE id = ?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

//create a comment
app.post('/comments', function (req, res) {
    var comment = {
        name: req.body.name,
        comment: req.body.comment,
        created_at: new Date()
    };
    connection.query('INSERT INTO comments SET ?', comment, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

//update a comment
app.put('/comments/:id', function (req, res) {
    var comment = {
        name: req.body.name,
        comment: req.body.comment
    };
    connection.query('UPDATE comments SET ? WHERE id = ?', [comment, req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

//delete a comment
app.delete('/comments/:id', function (req, res) {
    connection.query('DELETE FROM comments WHERE id = ?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

//start server
app.listen(3000, function () {
    console.log('Server running at port 3000');
});