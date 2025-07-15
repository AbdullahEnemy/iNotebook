const jwt=require('jsonwebtoken');
const secretToken=process.env.JWTSecretToken;

const checkToken=(req,res,next)=>{
    const token=req.header("Token");
    if(!token)
    {
        res.status(401).send({error:'please authenticate a valid token'});
    }
    const string =jwt.verify(token,secretToken);
    try{
        const string =jwt.verify(token,secretToken);
        req.user=data.user;
        next();
    }
    catch(err){
        res.status(401).send({error:'please authenticate a valid token'});

    }
    
}
module.exports={checkToken}