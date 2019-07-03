const computers = require("./lib/data");

const http = require("http"); 

http.createServer((req,res) => {
  const url = req.url.toLowerCase().split("?");
  const fs = require("fs");
    
  switch(url[0]) {
    case '/':
       fs.readFile("public/home.html", (err, data) => {
         if (err) return console.error(err);
         res.writeHead(200, {'Content-Type': 'text/html'});
         res.end(data.toString());
        });
      break;
    case '/about':
       fs.readFile("public/about.html", (err, data) => {
         if (err) return console.error(err);
         res.writeHead(200, {'Content-Type': 'text/html'});
         res.end(data.toString());
        });
      break;
    case '/get':
        if(url[1] === undefined){
            fs.readFile("public/errorpage.html", (err, data) => {
                if (err) return console.error(err);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data.toString());
            });
        } else {
            let params = url[1].split("=");
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(
            JSON.stringify(computers.getItem(params[1])),
        );
        }
      break;
    case '/delete':
        if(url[1] === undefined){
            fs.readFile("public/errorpage.html", (err, data) => {
                if (err) return console.error(err);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data.toString());
            });
        } else {
            let paramsDelete = url[1].split("=");
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('You have deleted: ' + JSON.stringify(computers.getItem(paramsDelete[1])));
        computers.deleteItem(paramsDelete[1]);
        }
          console.log(computers.getAll())
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      break;
    }
}).listen(process.env.PORT || 3000);