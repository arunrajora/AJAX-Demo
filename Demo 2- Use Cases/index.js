var express = require('express')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , app = express()
  , morgan = require('morgan');

  app.set('port', 3000);
  app.use(morgan(':method :url Status :status :req[body] - :response-time ms'));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(express.static(path.join(__dirname, 'public')));


app.get('/randomnumber',function(req,res){
    res.send((Math.floor(Math.random()*10)+1).toString());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});