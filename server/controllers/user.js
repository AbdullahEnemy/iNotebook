const User=require('../models/User');
const {body,validationResult}=require('express-validator');
const signupHandler=async(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({erros:errors.array()});
    }
    const email=req.body.email;
    const user=await User.findOne({email});
    if(user){
        res.status(400).json("User Already Exists");
    }
    try{
    const data=req.body;
    const newUser=  await User(data);
    newUser.save()
    res.status(201).json({message:"User Successfully Created"});
    }catch(err){
        res.status(500).json({message:"An error has occured"});
    }

       
}
module.exports = {  signupHandler};