// 'use strict';
require('rootpath')();
const express = require('express');
const config = require('config.js');
const cors = require('cors');
const bodyParser = require('body-parser');
var session = require('express-session');
const productRoutes = require('./routes/productRoutes');
const usersRoutes = require('./routes/usersRoutes');
const siteadmin = require('./routes/siteadmin');
const errorHandler = require('./handlelogin/error-handler');
const hbs = require('hbs');
var tempData = require('tempData');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(session({secret: "Shh, its a secret!"}));
app.use(tempData);
//Add middle ware to get static files
app.use(express.static(__dirname + '/public'));
// View Engine Setup
app.set('view options', { layout: 'layouts/sitelayout' });
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {});


app.use(function (req, res, next) {
  // Make `user` and `authenticated` available in templates
  //console.log("req.session.userid : ", req.session.userid);
  //console.log("req.session.username : ", req.session.username);
  if(req.session.userid != undefined && req.session.userid != 0){
    res.locals.userid = req.session.userid;
    res.locals.firstname = req.session.firstname;
    res.locals.username = req.session.username;
  }
  next();
});
app.get('/', function(req, res) {
  res.render('home');
});

app.use('/', productRoutes.routes);
app.use('/users', usersRoutes.routes);
app.use('/siteadmin', siteadmin.routes);
//app.use(errorHandler);



app.listen(config.port, () => {
  console.log('app listening on url http://localhost:' + config.port )
});