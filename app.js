var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors= require('cors');
const app = express();




//importing routes
var productsRouter = require('./routes/products');
var usersRouter = require('./routes/users');

//use the routers
app.use( '/api/products', productsRouter);
app.use( '/api/users', usersRouter);


app.use(cors({
      origin:"*",
      methods: ['GET', 'POST', 'PATCH','DELETE', 'PUT' ],
      allowedHeader: 'Content-Type, Authorisation, Origin, X-Requested-with,Accept'
}));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



module.exports = app;
