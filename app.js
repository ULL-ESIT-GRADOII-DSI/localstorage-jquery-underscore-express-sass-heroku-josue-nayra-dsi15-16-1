var express = require('express')
var app = express()
var csv = require('./csv.js')
var util = require('util')
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var expressLayouts = require('express-ejs-layouts');
app.set('layout', 'layout');

app.use(express.static('public'));
app.use(expressLayouts);

app.set('port', (process.env.PORT || 8080)); 

/*
 * body-parser is a piece of express middleware that 
 *   reads a form's input and stores it as a javascript
 *   object accessible through `req.body` 
 *
 * 'body-parser' must be installed (via `npm install --save body-parser`)
 * For more info see: https://github.com/expressjs/body-parser
 */

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res){
  res.render('index', { title: "Comma Separated Value Analyzer", error:""});
});

app.post('/csv', function(req, res, next){
    var original = req.body.original;
    if(!original){ 
      res.render('index', {title: "Comma Separated Value Analyzer", error: "Tabla vacía..."});
    }else{
      var data = csv.calculate(original);
      res.render('resultado', {items: data, title: "Comma Separated Value Analyzer", error:""});
    }
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});