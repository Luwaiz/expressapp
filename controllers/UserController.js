const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

// error handling function
const ErrorHandler = (e) => {
  console.log(e.message, e.code);
  let error = { username: "", email: "", password: "", token: "" };
  //user sign validation error handler
  if (e.message.includes("user validation failed")) {
    Object.values(e.errors).forEach(({ properties }) => {
      console.log(properties.path);
      error[properties.path] = properties.message;
    });
  }
  // username not found error handling
  if (e.message.includes("cannot find user with the username")) {
    console.log(e.message);
    error.username = e.message;
  }
  // password invalid error handling
  if (e.message.includes("Invalid password")) {
    console.log(e.message);
    error.password = e.message;
  }
  if (e.code === 11000) {
    error.username = "User already exists";
    return error;
  }

  return error;
};

// create a  user token
const maxTime = 60 * 60;
const createToken = ( id ) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxTime,
  });
};

//verify user token middleware
const verifyToken = (req, res, next) => {

  /// ================ THINGS YOU SHOULD GO AND LEARN ===================
  /// learn how to use:
  /// 1. Hashed maps / Maps (json) const map = { "name" : "",  "age" : "20" } -- map["name"] map["age"] { "data" : { "name" : "", "age" : "20"}} 
  /// class User:
  //  name: string
  //  age: string
  //  __init__(self, name: string, age: string):
  //    self.name = name
  //    self.age = age
  //
  //  function fromJson(json) {
  //    Name(name: json["name"], age: json["age"]) const
  //    // name = json["data"]["name"]
  //    // age = json["data"]["age"]
  //  }
  // }

  /// 2*. Arrays // most important thing in your life
  /// 3*. Loop arrays

  const token = req.headers["authorization"];
  const actualToken = token && token.startsWith("Bearer ") ? token.split(" ")[1] : null;
  console.log(actualToken)
  console.log("Trying to check if anything occurs");
  if (!actualToken) {
    return res.status(401).json({ message: "token required" });
  }
  jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: `Invalid token ${err.message}` });
    }
    console.log(decoded);
    console.log(decoded.id)
    req.decodedToken = decoded;
    next();
  });
};

// user sign up
const userSignUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(user);
    const token = createToken(user._id);
    console.log(token);
    res.cookie("who", token, { httpOnly: true, maxAge: maxTime * 1000 });
    user.token = token;
    console.log(user);
    res.status(200).json({ user });
  } catch (e) {
    const error = ErrorHandler(e);
    res.status(500).json({ error });
  }
};

//get all users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (e) {
    res.status(500);
    console.log(e.message);
    throw new Error(e.message);
  }
});

//logging in user
const userLogIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxTime * 1000 });
    console.log(token);
    user.token = token;
    res.status(200).json({ user });
  } catch (e) {
    const error = ErrorHandler(e);
    res.status(404).json({ error });
  }
};

//get user profile

const profile = async (req, res) => {
  try {
    const id = req.decodedToken.id;
    const user = await User.profile(id);
    res.status(200).json(user);
  } catch (e) {
    // res.status(500)
    // console.log(error)
    // throw new Error(error.message)\

    res.status(500).json({ message: e.message });
  }
};

// get user id
const getUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      throw new Error(`cannot find user with the Id ${id}`);
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// delete user with id
const deleteUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404);
      throw new Error(`cannot find user with the Id ${id}`);
    }
    res.status(200).json(user);
  } catch (e) {
    res.status(404)
    throw new Error(e.message);
  }
});

// update user with id
const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      res.status(404);
      throw new Error(`cannot find user with the Id ${id}`);
    }
    const UpdatedUser = await User.findById(id);
    console.log(UpdatedUser)
    res.status(200).json(user);
  } catch (e) {
    res.status(500);
    throw new Error(error.message);
  }
});

const patchUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body.token);
    const user = await User.findOneAndUpdate({_id:id},req.body,{new : true});
    console.log(user)
    await user.save();
    console.log(user)
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(500);
    throw new Error(error.message);
  }
});
module.exports = {
  patchUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  userSignUp,
  updateUser,
  userLogIn,
  profile,
  verifyToken,
};
