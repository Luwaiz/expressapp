const express = require('express');
const router = express.Router();
const {getAllUsers,getUserById,deleteUserById,userSignUp, updateUser,userLogIn}= require("../controllers/UserController");
const User = require('../models/UserModel');
const cookieParser =  require("cookie-parser")

router.use(cookieParser())
router.use(express.json())
//middleware for the app to be able to accept data through form
router.use(express.urlencoded({extended:false}))


//get method to get all the users in database
router.get('/',getAllUsers)

//post method to log user in
router.post("/login",userLogIn)

//get method to get user by id from the database
router.get("/:id",getUserById)

//delete method to delete user by id from the database
router.delete("/:id",deleteUserById)


//post method to request for the user details
router.post("/" ,userSignUp)

//put method to update a user
router.put("/:id",updateUser)

module.exports = router;
