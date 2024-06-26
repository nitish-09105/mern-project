//? In an Express.js application, a "controller" refers to a part of your code that is responsible for handling the application's logic. Controllers are typically used to process incoming requests, interact with models (data sources), and send responses back to clients. They help organize your application by separating concerns and following the MVC (Model-View-Controller) design pattern.

const User = require("../models/user_model");

const { response } = require("express");
const bcrypt = require("bcryptjs");
//---------------------- Home----------------------
const home = async (req, res) => {
  try {
    res.status(200).send("this is home page");
  } catch (error) {
    console.log("error");
  }
};


// ----------------------- User Registration------------------------
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    console.log(req.body);

    // check email exist or not
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ msg: "Email already exist" });
    }

    // create a new user

    // hash the password 
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });
    res.status(201).json({ 
      msg: "registration successful", 
    
      token:await userCreated.generateToken(),
      userId: userCreated._id.toString(), }); // In most cases, converting _id to a string is a good practice because it ensures consistency and compatibility across different JWT  libraries and systems. It also aligns with the expectation that claims in a JWT are represented as strings.
  } catch (error) {
    console.log(error);
    // res.status(500).json("internal server error");
    next(error)
  }
};


// ---------------------------------User Login-----------------------------------
const login=async(req,res)=>{
  try {
    const{email,password}=req.body;

    // check user exist or not
    const userExist = await User.findOne({ email });  // here userExist will store the complete data of that id like email, password, phone,etc
    console.log(userExist)
    // if user does not exist
  
    if(!userExist){
      return res.status(400).json({message:"Invalid Credentials"})
    }

    // if user exist  
    const isPasswordValid=await userExist.comparePassword(password)
    
    
    if(isPasswordValid){
      res.status(200).json({ 
        msg: "Login Successful", 
        token:await userExist.generateToken(),
        userId: userExist._id.toString(), 
      }); 
    }
    else{
      res.status(401).json({message:"Invalid email or password"})
    }
  } catch (error) {
   console.log(error)
   res.status(500).json({message:"internal server error"});
 
  }
}



module.exports = { home, register,login };
