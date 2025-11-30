
const User = require('../models/User'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 




//  Generate Jwt Token 
const generateToken = (userId)=> { 
    return jwt.sign({id:userId}, process.env.JWT_SECRET, {expiresIn:'7d'}); 
}; 



// @desc Register New User 
//@route Post /api/auth/register 
// @access Public 



const registerUser = async (re,res)=> {

}; 





// @desc Login User 
//  @route POST /api/auth/profile 
//  @access Public 


const loginUser = async (req,res)=>{

}; 


// @desc  Get User Profile 
// @route Get/api/auth/profille 
// access Privates (Reuie Jwt) 



const getUserProfile = async (req,res)=>{
}; 



// @desc Update user preofile 
// @route Put/api/auth/profille
// access Privates (Reuire JWT)



const updatUserProfile = async (req,res)=>{

}; 


module.exports={registerUser, loginUser, getUserProfile, updatUserProfile}
