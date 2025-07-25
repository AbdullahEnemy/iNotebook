const User=require('../models/User');
const {body,validationResult}=require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const secretToken=process.env.JWTSecretToken;
const signupHandler=async(req,res)=>{
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({erros:errors.array(),success});
    }
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;
    const user=await User.findOne({email});
    if(user){
       return  res.status(400).json({message:"User Already Exists",success});
    }
    try{
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(password,salt);
    const newUser=new User();
    newUser.name=name;
    newUser.password=secPass;
    newUser.email=email;
    await newUser.save()
    const data={
        user:{
            id:newUser.id,
            email:newUser.email
        }
    }
    const authToken=jwt.sign(data,secretToken,{expiresIn:"12h"});
    success=true;
    return res.status(201).json({message:"User Successfully Created",Token:authToken,success});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"An error has occured",success});
    }
}
const loginHandler =async(req,res)=>{
    let success=false;
    try{
    const { email, password } = req.body;

    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"Please try to login with correct credentials",success});
    }
    const passwordComp=await bcrypt.compare(password,user.password);
    if(!passwordComp)
        {
            
            return res.status(400).json({message:"Please try to login with correct credentials",success});
        }
    const data={
        user:{
            id:user.id,
            email:user.email
        }
    }
    const authToken=jwt.sign(data,secretToken,{expiresIn:"12h"});
    success=true;
    return res.status(200).json({message:"User login Successfully",Token:authToken,success});    
    }
    catch(err){
        console.log(err);
       return  res.status(500).json({message:"An error has occured",success});
    }   
}
const getUserHandler=async(req,res)=>{
    try{
    const userId=req.user.id;
    const user=await User.findById(userId);
    return res.status(200).json({
      message: "user found",
      name:user.name,
      uid: user._id,
      email: user.email,
      joined: user.date
    });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"An error has occured"});
    }

}

module.exports = {  signupHandler,loginHandler,getUserHandler};