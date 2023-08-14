import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token)
    return next(createError(401,"you are not authenticated"));
    // jwt.verify(err,user)//return user(id,isAdmin jo send kiya tha)
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err){
            return next(createError(403,"Token is not correct"));
        }
        req.user=user;// new authenticated property of the user(all data)
        next();
    });
}
export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.params.id||req.user.isAdmin)
        next();
        return next(createError(403,"Token is not correct"));
    })
}
export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin)
        next();
        return next(createError(403,"Token is not correct"));
    })
}