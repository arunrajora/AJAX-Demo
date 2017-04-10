var express = require('express')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , app1 = express()
  , app2 = express()
  , morgan = require('morgan');

  app1.set('port', 3000);
  app1.use(morgan(':method :url Status :status :req[body] - :response-time ms'));
  app1.use(bodyParser.urlencoded({
    extended: true
  }));
  app1.use(express.static(path.join(__dirname, 'public')));

  app2.set('port', 3005);
  app2.use(morgan(':method :url Status :status :req[body] - :response-time ms'));
  app2.use(bodyParser.urlencoded({
    extended: true
  }));
  app2.use(express.static(path.join(__dirname, 'public')));


/*app2.options("/randomnumber", function(req, res){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, authentication');
  res.send(200);
});*/

app2.get('/randomnumber',function(req,res){
  /*res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, authentication');*/
    res.send((Math.floor(Math.random()*10)+1).toString());
});

http.createServer(app1).listen(app1.get('port'), function(){
  console.log("Express server listening on port " + app1.get('port'));
});

http.createServer(app2).listen(app2.get('port'), function(){
  console.log("Express server listening on port " + app2.get('port'));
});