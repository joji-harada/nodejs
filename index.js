'use strict'
// const computers = require("./lib/data");
const computers = require('./models/computer');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

const handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html");


/*below uses handlebars templating and views
the curly brackets accesses the {{}} in view/home.html file
and inserts the key-value pair into the {{}} statement*/
app.get('/', (req, res) => {
    computers.find({}, {'_id': false}, (err, items) => {
        if (err) return next(err);
        res.render('home', {computers:items});
    });
});
    
// handle form submission response
app.post('/detail', (req,res) => {
    computers.findOne({'title':req.body.title}, {'_id':false}, (err, item) => {
        if (err) return next(err);
        res.render('detail',{ computer: item });
    })
});

app.get('/detail', (req,res) => {
    computers.findOne({'title':req.query.title}, {'_id':false}, (err, item) => {
        if (err) return next(err);
        res.render('detail',{ computer: item });
    })
});

// send plain text response
app.get('/about', (req, res) => {
    res.type('text/html');
    res.sendFile('about');
});

//delete item
app.get('/delete', (req,res) => {
    computers.deleteOne({'title':req.query.title}, (err, item) => {
        if (err) return next(err);
        computers.countDocuments((err, result) => {
            res.render('delete', {
                title:req.query.title,
                count:result
            });
        })
    })
});

app.get('/addform', (req,res) => {
    res.render('addform');
})

app.post('/add', (req,res) => {
    let newComputer = {'title':req.body.title, 'type':req.body.type, 'price': req.body.price};
    computers.update({'title':req.body.title}, newComputer, {upsert:true}, (err, result) => {
        if (err) return next(err);
        console.log(result);
        res.render('add', {
            title: req.body.title,
            type: req.body.type,
            price: req.body.price
        })
    })
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