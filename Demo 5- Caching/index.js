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


app.get('/sample-get',function(req,res){
    res.send(Math.random().toString());
});

app.post('/sample-post', function(req, res) {
    var fname = req.body.fname,
        lname = req.body.lname,
        age = req.body.age;
        console.log("Post received: ",res.body);
        res.send("Hi "+fname+" "+lname+"\n"+"Thanks for signing up.");
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});