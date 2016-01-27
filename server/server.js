//define requirements
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var seedDummyData = require('./config/dummyData.js');
var db = require('./db/dbModel');

//create instance of express server
var app = express();

//set up middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//serve up static files upon initialization of server
app.use(express.static(path.join(__dirname, "/client")));

//listen on routes   
require('./config/routes.js')(app);

//set up port for server
var port = process.env.PORT || 3000;

//set server to list on port specified above
app.listen(port, function(){
 console.log('Server listening on port ' + port);
});  

//create database
db.init();

//export server
module.exports = app;