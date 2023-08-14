import User from "../models/User.js";
export const updateUser=async(req,res,next)=>{
    try{
        const updatedUser= await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).send(updatedUser); 
      }catch(error){
        next(error);
      }
}
export const deleteUser=async(req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
       res.status(200).send("deleted successfully"); 
     }catch(error){
       res.status(500).send(err);
     }
}
export const GetALLUser=async(req,res,next)=>{
    try{
        const users= await User.find();
        res.status(200).send(users); 
      }catch(error){
        next(error);
      }
}
export const GetUser=async(req,res,next)=>{
    try{
        const user =await User.findById(req.params.id);
       res.status(200).send(user); 
     }catch(error){
       next(error);
     }
}
