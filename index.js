const express = require('express');
var bodyParser = require('body-parser')

const app = express();

app.use (function(req, res, next) {
    var data='';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
       data += chunk;
    });
    req.on('end', function() {
        req.body = data;
        next();
    });
});

app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    //console.log(req.method+''+req.url)
    //console.log(req.body)
  next()
})

app.post('/iclock/cdata', function(request, response) {
    response.send("OK\n");
    var obj = request.query.table
    //console.log(request.query)
    if(obj=='rtlog'){
        //console.log(request.body);
        let tx = request.body;
        let ty = request.body.search("temperature=")
        let tz = ty+12 
        let Temperature = parseFloat(tx.slice(tz,tz+5))
        console.log('Time:'+tx.slice(4,24)+' Temperature:' + Temperature );
        
    }
});
app.post('/iclock/push', function(request, response) {
    let txt = `ServerVersion=10.2
    ServerName=myServerName
    PushVersion=5.6
    ErrorDelay=30
    RequestDelay=3
    TransTimes=00:30	13:00
    TransInterval=1
    TransTables=User	Transaction
    Realtime=1
    SessionID=63A4B280F6C65AEFE891A2717E1F5D03`
    response.send(txt);
    console.log('push')
});

app.post('/iclock/registry', function(request, response) {
    response.send("RegistryCode=vYtxAevORb\n");
    console.log('registry')
});

app.post('/iclock/ping', function(request, response) {
    response.send("OK\n");
    console.log('ping')
});
app.get('/iclock/ping', function(request, response) {
    response.send("OK\n");
    console.log('ping')
});
app.get('/iclock/cdata', function(request, response) {
    response.send("OK\n");
    console.log(request.query)
});

app.get('/iclock/getrequest', function(request, response) {
    response.send("OK\n");
    //console.log(request.params)
});
app.listen(3000, function() {console.log('Example app listening on port 3000!')});