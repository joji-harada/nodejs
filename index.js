'use strict'
// const computerdata = require("./lib/data");
const computers = require('./models/computer');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions
app.use(bodyParser.json());
app.use('/api', require('cors')()); //set Access-control-allow-origin header for api route

const handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html");


/*below uses handlebars templating and views
the curly brackets accesses the {{}} in view/home.html file
and inserts the key-value pair into the {{}} statement*/
app.get('/', (req, res) => {
    computers.find({}, (err, items, next) => {
        if (err) return next(err);
        res.render('home', {computers: JSON.stringify(items)});
    });
});
    
// handle form submission response
app.post('/detail', (req,res,next) => {
    computers.findOne({'title':req.body.title}, {'_id':false}, (err, item) => {
        if (err) return next(err);
        res.render('detail',{ computer: item });
    })
});

app.get('/detail', (req,res,next) => {
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
    computers.deleteOne({'title':req.query.title}, (err, next) => {
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

//api routes
//api getAll
app.get('/api/detail', (req,res,next) => {
    computers.find({},{"_id":false}, (err, items) => {
        if (err) return next(err);
        res.json(items);
    })
});

//api getOne
app.get('/api/detail/:title', (req,res,next) => {
    computers.findOne({title:req.params.title},{"_id":false},(err, item) => {
        if (err) return next(err);
        res.json(item);
    })
});

//api delete
app.get('/api/delete/:id', (req,res,next) => {
    console.log(req.params)
    computers.deleteOne({_id:req.params.id}, (err, item) => {
        if (err) return next(err);
        res.json(item);
    })
});


//api add
app.post('/api/add/', (req,res,next) => {
    console.log(req.body)
    computers.update({'_id':req.body._id}, req.body, {upsert:true}, (err, result) => {
        console.log(result);
        /*
{ n: 1,
  nModified: 0,
  upserted: [ { index: 0, _id: 5d4a2bafa0764c6aa056a270 } ],
  opTime:
   { ts:
      Timestamp { _bsontype: 'Timestamp', low_: 1, high_: 1565141935 },
     t: 3 },
  electionId: 7fffffff0000000000000003,
  ok: 1,
  operationTime:
   Timestamp { _bsontype: 'Timestamp', low_: 1, high_: 1565141935 },
  '$clusterTime':
   { clusterTime:
      Timestamp { _bsontype: 'Timestamp', low_: 1, high_: 1565141935 },
     signature: { hash: [Binary], keyId: [Long] } } }        */
        if(!result.upserted){
            res.json({title: req.body.title, _id: req.body._id});
        } else {
            res.json({title:req.body.title, _id: result.upserted[0]._id})
        }
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