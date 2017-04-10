var hea='<!DOCTYPE html><html><head>  <meta charset="utf-8">  <meta http-equiv="X-UA-Compatible" content="IE=edge">  <title>Polling</title>  <link rel="stylesheet" href="styles.css">  <script src="script.js"></script></head><body>  <div class="header">    <div class="hitem" id="long"><a id="along" href="/long_term_polling.html">Long</a></div>		<div class="hitem" id="short"><a id="ashort" href="/short_term_polling.html">Short</a></div>  </div>  <center>    <div id="page_container">';
var tai='   </div></center></body></html>';
var stp='<div class="frmcont">  <div class="diagramcont">    <div class="empty" id="white1"></div></div>  <div class="tempcont">    <p class="tempreading" id="temp1">100</p><p> Deg</p></div>\n</div>';
var ltp='<div class="frmcont"> <div class="diagramcont">    <div class="empty" id="white2"></div>  </div>  <div class="tempcont">    <p class="tempreading" id="temp2">100</p>    <p> Deg</p>  </div></div>';


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

app.get('/short_term_polling.html',function(req,res){
      res.send(hea+stp+tai);
});

app.get('/long_term_polling.html',function(req,res){
      res.send(hea+ltp+tai);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});