var express = require('express')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , app = express()
  , fileUpload = require('express-fileupload')
  , morgan = require('morgan');

  var counter=0;

  app.set('port', 3000);
  app.use(morgan(':method :url Status :status :req[body] - :response-time ms'));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(fileUpload());
  app.use(express.static(path.join(__dirname, 'public')));
  var browserSync = require('browser-sync');
  var bs = browserSync.create().init({ logSnippet: false });
  app.use(require('connect-browser-sync')(bs));

app.get('/spoll',function(req,res){
    res.send((Math.floor(Math.random()*200)+1).toString());
});

app.get('/lpoll',function(req,res){
    setTimeout(function(){
      res.send((Math.floor(Math.random()*200)+1).toString());
    },Math.floor(Math.random()*10)*1000);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});