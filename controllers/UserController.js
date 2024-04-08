const User = require("../models/UserModel")
const asyncHandler = require('express-async-handler')


const createUser = asyncHandler(async (req,res)=>{
    try{
      const userInclude = await User.findOne({email:req?.body?.email})
      if(userInclude){
        res.status(404)
        throw new Error(`user already created`)
        return res.status(404).json({message: ``})
      }
      const user= await User.create(req.body)
      res.status(200).json(user)
    }
    catch(e){
      res.status(500)
      throw new Error(error.message)
    }
      console.log(req.body)
    })

const getAllUsers = asyncHandler(async(req,res)=>{
    try{
      const users= await User.find({})
      res.status(200).json(users)
    }
    catch(e){
      res.status(500)
      throw new Error(error.message)    
    }
  })

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
    createUser,
    updateUser
  }