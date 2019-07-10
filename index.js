'use strict'
const computers = require("./lib/data");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

const handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html");


// send static file as response
//app.get('/', (req, res) => {
//    res.type('text/html');
//    res.sendFile(__dirname + '/public/home.html');
//});

/*below uses handlebars templating and views
the curly brackets accesses the {{}} in view/home.html file
and inserts the key-value pair into the {{}} statement*/
app.get('/', (req, res) => {
    res.render('home');
});

// send plain text response
app.get('/about', (req, res) => {
    res.type('text/html');
    res.sendFile(__dirname + '/public/about.html');
});

// handle form submission response
app.post('/detail', (req,res) => {
    let result = computers.getItem(req.body.computer);
    res.render('detail', {title: req.body.computer, result: result})
});

app.get('/delete', (req,res) => {
    //let deletedItem = computers.getItem(req.query.computer);
    let result = computers.deleteItem(req.query.computer);
    res.render('delete', {
        deletedItem: req.query.computer,
        result: result})
});

// define 404 handler
app.use( (req,res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');
});

