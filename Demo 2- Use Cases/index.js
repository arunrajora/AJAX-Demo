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

app.get('/randomnumber',function(req,res){
    res.send((Math.floor(Math.random()*10)+1).toString());
});

app.get('/getsubmit',function(req,res){
    console.log("GET",req.query);
    res.send(req.query);
});

app.post('/postsubmit',function(req,res){
    console.log("POST",req.body);
    res.send(req.body);
});

app.post('/filesubmit',function(req,res){
    console.log("POST",req.files.afile);
    res.send(req.files.afile.name);
});

app.get('/log',function(req,res){
  counter+=1;
  console.log(counter.toString());
  res.send("done");
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});