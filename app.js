// var createError = require("http-errors");
// var express = require('express');
// var path = require("path");
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

const express=require('express')
const app= express()
const mongoose=require("mongoose")
const port= 5000

app.get('/',(req,res)=>{
    res.send("hello a get ")
})
app.post('/User' ,(req,res)=>{
    console.log(req.body)
    res.send("gatti")
})



mongoose.connect("mongodb+srv://admin:Eluwaiz321@ciboapi.vez1aya.mongodb.net/NODEAPI?retryWrites=true&w=majority&appName=ciboAPI")
.then(()=>{
  console.log("connected to mongodb")
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}).catch((e)=>{
  console.log(e)
})
  // (105.113.81.181) IP address