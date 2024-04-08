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
const User = require('./models/UserModel')
const port= 5000

//middleware for the app to be able to accept json files
app.use(express.json())
//middleware for the app to be able to accept data through form
app.use(express.urlencoded({extended:false}))

//get method to get all the users in database
app.get('/users',async(req,res)=>{
    try{
      const users= await User.find({})
      res.status(200).json(users)
    }
    catch(e){
      res.status(500).json({message:e.message})
    }
})

//get method to get user by id from the database
app.get("/user/:id",async (req,res)=>{
  try{
    const {id}=req.params
    const user = await User.findById(id)
    res.status(200).json(user)
  }
  catch(e){
    res.status(500).json({message:e.message})
  }
})

//delete method to delete user by id from the database
app.delete("/user/:id",async (req,res)=>{
  try{
    const {id}=req.params
    const user = await User.findByIdAndDelete(id)
    res.status(200).json(user)
    if(!user){
      res.status(404).json({message: `cannot find user with the Id ${id}`})
    }
    res.status(200).json(user)
  }
  catch(e){
    res.status(500).json({message:e.message})
  }
})


//post method to request for the user details
app.post("/user" ,async (req,res)=>{

  try{
    const user= await User.create(req.body)
    res.status(200).json(user)
  }
  catch(e){
    console.log(e.message)
    res.status(500).json({message: e.message})
  }
    console.log(req.body)
})

//put method to update a user
app.put("/user/:id", async (req,res)=>{
  try{
    const {id}=req.params
    const user = await User.findByIdAndUpdate(id,req.body)
    if(!user){
      res.status(404).json({message: `cannot find user with the Id ${id}`})
    }
    const UpdatedUser = await User.findById(id)
    res.status(200).json(UpdatedUser)
  }
  catch(e){
    res.status(500).json({message: e.message})
  }
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