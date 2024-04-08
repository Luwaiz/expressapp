require('dotenv').config()
const express=require('express')
const app= express()
const cors = require('cors')
const mongoose=require("mongoose")
const UserRouter = require("./routes/users")
const Middleware =require("./middlewares/Middleware")

const MONGO_url=process.env.MONGO_URL
const port=process.env.PORT||5000

app.use(cors())
//middleware to use user router
app.use("/api/user" ,UserRouter)
//middleware for the app to be able to accept json files
app.use(express.json())
//middleware for the app to be able to accept data through form
app.use(express.urlencoded({extended:false}))
// error middleware
app.use(Middleware)
// cors middleware


app.get("/",(req,res)=>{
  res.send("hahaha")
})

mongoose.connect(MONGO_url)
.then(()=>{
  console.log("connected to mongodb")
  app.listen(port,() => {

    console.log(`Example app listening on port ${port}`)
  })
}).catch((e)=>{
  console.log(e)
})
  // (105.113.81.181) IP address