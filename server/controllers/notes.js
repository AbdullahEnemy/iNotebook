
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
    return res.status(201).json({message:"Note saved Successfully",savedNotes});
    }
    catch(err){
        console.log(err);
       return  res.status(500).json({message:"Falied to save note"});
    }

}
const updateNotes=async(req,res)=>{
   const userId=req.user.id;
   const notesId=req.params.id;
   let note=await Notes.findById(notesId);
   if(!note){
    return res.status(404).json({message:"Not Found"})
   }
   if(userId!==note.user.toString()){
    return res.status(403).json({message:"Unauthorized action"})
   }
   const{title,description,tag}=req.body;
   try
   {
    const newNotes={};
    if(title){newNotes.title=title};
    if(description){newNotes.description=description};
    if(tag){newNotes.tag=tag};
    note=await Notes.findByIdAndUpdate(notesId,{$set:newNotes},{new:true});
    return res.status(200).json({message:"Note Updated successfully"});
   }
   catch(err){
        console.log(err);
        return  res.status(500).json({message:"Falied to update note"});

   }
}
const deleteNote=async(req,res)=>{
   const userId=req.user.id;
   const notesId=req.params.id;
   let note=await Notes.findById(notesId);
   if(!note){
    return res.status(404).json({message:"Not Found"})
   }
   if(userId!==note.user.toString()){
    return res.status(403).json({message:"Unauthorized action"})
   }
   try{
        const deletenote=await Notes.findByIdAndDelete(notesId);
        return res.status(200).json({message:"Note deleted successfully"},deletenote);
   }
   catch(err){
        console.log(err);
        return  res.status(500).json({message:"Falied to delete note"});
   }

}
module.exports={getAllNotes,addNotes,updateNotes,deleteNote};