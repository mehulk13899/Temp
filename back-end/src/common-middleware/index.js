const jwt=require('jsonwebtoken');
const { validationResult}=require('express-validator');

exports.isRequestValidated=(req,res,next)=>{
    const errors=validationResult(req);
    if(errors.array().length>0)
    {
        return res.status(400).json({
            error:errors.array()[0].msg
        });
    }
    next();
}


exports.requireSignin=(req,res,next)=>{
    if(req.headers.authorization){
        const token=req.headers.authorization.split(" ")[1];
        console.log(token);
        const admin = jwt.verify(token,process.env.JWT_SECRET);
        next();
    }
    return res.status(400).jason({message:'Token required'})
}

exports.userMiddleware=(req,res,next)=>{

}

exports.adminMiddleware=(req,res,next)=>{
    if(req.user.role!=='admin'){
        return res.status(400).jason({message:'Access denied'})
    }
    next();
}