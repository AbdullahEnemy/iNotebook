const User=require('../models/User');
const {body,validationResult}=require('express-validator');
const signupHandler=async(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({erros:errors.array()});
    }
    console.log(req.body);
    const data=req.body;
    const user=  User(data);
    user.save()
    res.send(user);
       
}
module.exports = {  signupHandler};