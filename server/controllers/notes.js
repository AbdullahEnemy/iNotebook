
const Notes=require("../models/Notes");
const User=require('../models/User');
const {body,validationResult}=require('express-validator');
const getAllNotes = async (req, res) => {
  try {
    let success=false;
    const userId = req.user.id;
    const allNotes = await Notes.find({user:userId });
    success=true;
    return res.status(200).json({
      message: "Notes fetched successfully",
      notes: allNotes,
      success
    });
  } catch (err) {
    console.error(err);
    success=false;
   return  res.status(500).json({ message: "Server error while fetching notes",success });
  }
};

const addNotes=async(req,res)=>{
  let success=false;
    const userId=req.user.id;
    const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({erros:errors.array(),success});
        }
    const{title,description,tag}=req.body;
    try{
    const newNote = new Notes({
        title,
        description,
        tag,
        user: req.user.id  
    });
    success=true;
    const savedNotes=await newNote.save();
    return res.status(201).json({message:"Note saved Successfully",savedNotes,success});
    }
    catch(err){
        console.log(err);
        success=false;
       return  res.status(500).json({message:"Falied to save note",success});
    }

}
const updateNotes=async(req,res)=>{
  let success=false;
   const userId=req.user.id;
   const notesId=req.params.id;
   let note=await Notes.findById(notesId);
   if(!note){
    return res.status(404).json({message:"Not Found",success})
   }
   if(userId!==note.user.toString()){
    return res.status(403).json({message:"Unauthorized action",success})
   }
   const{title,description,tag}=req.body;
   try
   {
    const newNotes={};
    if(title){newNotes.title=title};
    if(description){newNotes.description=description};
    if(tag){newNotes.tag=tag};
    note=await Notes.findByIdAndUpdate(notesId,{$set:newNotes},{new:true});
    success=true;
    return res.status(200).json({message:"Note Updated successfully",success});
   }
   catch(err){
    success=false;
        console.log(err);
        return  res.status(500).json({message:"Falied to update note",success});

   }
}
const deleteNote=async(req,res)=>{
  let success=false;
   const userId=req.user.id;
   const notesId=req.params.id;
   let note=await Notes.findById(notesId);
   if(!note){
    return res.status(404).json({message:"Not Found",success})
   }
   if(userId!==note.user.toString()){
    return res.status(403).json({message:"Unauthorized action",success})
   }
   try{
    success=true;
        const deletenote=await Notes.findByIdAndDelete(notesId);
        return res.status(200).json({message:"Note deleted successfully",success});
   }
   catch(err){
        console.log(err);
        return  res.status(500).json({message:"Falied to delete note"},success);
   }

}
module.exports={getAllNotes,addNotes,updateNotes,deleteNote};