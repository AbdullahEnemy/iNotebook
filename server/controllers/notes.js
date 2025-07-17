const Notes=require("../models/Notes");
const User=require('../models/User');
const {body,validationResult}=require('express-validator');
const getAllNotes=async(req,res)=>{
    const userID=req.user.id;
    const user=await User.findById(userID);
    if(!user){
        return res.status(401).json({message:"User Not found"});
    }
    const allNotes=Notes.find({userId:user._id});
    res.Notes(allNotes);

}
const addNotes=async(req,res)=>{
    const userId=req.user.id;
    const user=await User.findById(userId);
    if(!user){
        return res.status(401).json({message:"User Not found"});
    }
    const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({erros:errors.array()});
        }
    const{title,description,tag}=req.body;
    try{
    const newNote = new Notes({
        title,
        description,
        tag,
        user: req.user.id  
    });
    const savedNotes=await newNote.save();
    return res.status(201).json({message:"Note saved Successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Falied to save note"});
    }

}
module.exports={getAllNotes,addNotes};