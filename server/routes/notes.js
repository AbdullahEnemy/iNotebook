const express=require("express");
const router =express.Router();
const notesControllers=require("../controllers/notes");
const { body, validationResult } = require('express-validator');
const verify=require('../middleware/jwt')
router.get("/getallnotes",verify.checkToken,notesControllers.getAllNotes)
module.exports=router;