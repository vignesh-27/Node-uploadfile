var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var todocontroller = require('./controllers/mongodb');

var app = express();

//initialize template engine
app.set('view engine', 'ejs');

//setting static file
app.use(express.static('./public'));

//Declaring middleware body-parser
var urlencodedParser = bodyParser.urlencoded({extended:false});

//fire function
todocontroller(app);    // todo controller file call funtion

//Database connection
mongoose.connect('mongodb://localhost/filedb', err=>{
    if(err){
        console.log('Your database not connected');
    }else{
        app.listen(5000);
        console.log('Your app running port 5000');
    }
});
