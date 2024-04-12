const User = require("../models/UserModel")
const asyncHandler = require('express-async-handler')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



// error handling function
const ErrorHandler=(e)=>{
  console.log(e.message,e.code)
  let error={username: "",email:"", password: "",}
  if(e.message.includes("user validation failed")){
    Object.values(e.errors).forEach(({properties})=>{
      console.log(properties.path)
      error[properties.path]=properties.message
    })
  }

   if (e.code===11000){
    error.username=" User already exists"
    return error
   }

  return error
}


// create a  user token
const maxTime= 24*60*60
const createToken =(id)=>{
  return jwt.sign({id},"I have never seen what the united states look like but i want to go to canada ",{
    expiresIn:maxTime
  })
}

// user sign up
const userSignUp = async (req,res)=>{
    try{
      
      const user= await User.create(req.body)
      const tokenId = createToken(user._id)
      res.cookie("JWT",tokenId,{httpOnly:true,maxAge:maxTime*1000})
      const token =user.token
      console.log(tokenId)
      res.status(200).json({user,token:tokenId})
    }
    catch(e){
      const error=ErrorHandler(e)
      res.status(500).json({error})
    }
      console.log(req.body)
    }

//get all users
const getAllUsers = asyncHandler(async(req,res)=>{
    try{
      const users= await User.find({})
      res.status(200).json(users)
    }
    catch(e){
      res.status(500)
      console.log(e.message)
      throw new Error(e.message)    
      
    }
  })


//logging in user
const userLogIn= async (req, res) => {
  try{
    const username=req.body.username
    const password=req.body.password
    const user = await User.findOne({username:username})
    if(!user){
      res.status(404)
      throw new Error(`cannot find user with the username ${username}`)
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send('Invalid password');
    }
    res.status(200).json(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

// get user id
const getUserById = asyncHandler(async (req,res)=>{
    try{
      const {id}=req.params
      const user = await User.findById(id)
      if(!user){
        res.status(404)
        throw new Error(`cannot find user with the Id ${id}`)
      }
      res.status(200).json(user)
    }
    catch(error){
      res.status(500)
      throw new Error(error.message)
    }
    })

// delete user with id
const deleteUserById = asyncHandler(async (req,res)=>{
    try{
      const {id}=req.params
      const user = await User.findByIdAndDelete(id)
      if(!user){
        res.status(404)
        throw new Error(`cannot find user with the Id ${id}`)      
      }
      res.status(200).json(user)
    }
    catch(e){
      res.status(500)
      throw new Error(error.message)    
    }
    })

// update user with id
const updateUser =  asyncHandler(async (req,res)=>{
      try{
        const {id}=req.params
        const user = await User.findByIdAndUpdate(id,req.body)
        if(!user){
          res.status(404)
          throw new Error(`cannot find user with the Id ${id}`)
        }
        const UpdatedUser = await User.findById(id)
        res.status(200).json(UpdatedUser)
      }
      catch(e){
        res.status(500)
        throw new Error(error.message)      
      }
      })
      
  module.exports={
    getAllUsers,
    getUserById,
    deleteUserById,
    userSignUp,
    updateUser,
    userLogIn
  }