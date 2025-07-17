const Notes=require("../models/Notes");
const User=require('../models/User');
const {body,validationResult}=require('express-validator');
const getAllNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const allNotes = await Notes.find({user:userId });
    return res.status(200).json({
      message: "Notes fetched successfully",
      notes: allNotes,
    });
  } catch (err) {
    console.error(err);
   return  res.status(500).json({ message: "Server error while fetching notes" });
  }
};

const addNotes=async(req,res)=>{
    const userId=req.user.id;
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
       return  res.status(500).json({message:"Falied to save note"});
    }

}
module.exports={getAllNotes,addNotes};