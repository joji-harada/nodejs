'use strict'
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

//below uses handlebars templating and views
//the curly brackets accesses the view/home.html file
//and inserts the key-value pair into the {{}} statement
app.get('/', (req, res) => {
    res.render('home', {name: req.query.name});
});

// send plain text response
app.get('/about', (req, res) => {
    res.type('text/html');
    res.sendFile(__dirname + '/public/about.html');
});

// handle form submission response
app.post('/detail', (req,res) => {
    res.render('detail', {name: req.body.username})
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


//******************* ABOVE UTILIZES EXRESS 3RD PARTY ************************
//******************* BELOW IS STANDARD NODE CODE ****************************
//
//
//const http = require("http"); 
//
//http.createServer((req,res) => {
//  const path = req.url.toLowerCase();
//  const fs = require("fs");
//  switch(path) {
//    case '/':
//       fs.readFile("public/home.html", (err, data) => {
//         if (err) return console.error(err);
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end(data.toString());
//        });
//      break;
//    case '/about':
//       fs.readFile("public/about.html", (err, data) => {
//         if (err) return console.error(err);
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end(data.toString());
//        });
//      break;
//    default:
//      res.writeHead(404, {'Content-Type': 'text/plain'});
//      res.end('Not found');
//      break;
//    }
//}).listen(process.env.PORT || 3000);