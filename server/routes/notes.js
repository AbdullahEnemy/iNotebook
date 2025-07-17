const express=require("express");
const router =express.Router();
const notesControllers=require("../controllers/notes");
const { body, validationResult } = require('express-validator');
const verify=require('../middleware/jwt')
router.get("/getallnotes",verify.checkToken,notesControllers.getAllNotes)
router.post("/addnotes",
  [
    body('title').isLength({ min: 3}).withMessage('Enter a valid Title'),
    body('description').isLength({ min: 5}).withMessage('Description must be atleast 5 characters')
  ],verify.checkToken,notesControllers.addNotes)
module.exports=router;