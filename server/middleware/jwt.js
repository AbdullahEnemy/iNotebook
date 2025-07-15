const jwt=require('jsonwebtoken');
const secretToken=process.env.JWTSecretToken;

const checkToken=(req,res,next)=>{
    const token=req.header("authToken");
    try{
    if(!token)
    {
       return res.status(401).send({error:'please authenticate a valid token'});
    }
        const data =jwt.verify(token,secretToken);
        req.user=data.user;
        next();
    }
    catch(err)
    {
        return res.status(401).send({error:'please authenticate a valid token'});
    }
}
module.exports={checkToken}