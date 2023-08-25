import Hotel from "../models/Hotel.js";
export const createHotel=async(req,res,next)=>{
    const newHotel=new Hotel(req.body);
    try{
      const createdHotel= await newHotel.save();
      res.status(200).send(createdHotel); 
    }catch(error){
     next(error);
    }
}
export const updateHotel=async(req,res,next)=>{
    try{
        const updatedHotel= await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).send(updatedHotel); 
      }catch(error){
        next(error);
      }
}
export const deleteHotel=async(req,res,next)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id);
       res.status(200).send("deleted successfully"); 
     }catch(error){
       res.status(500).send(err);
     }
}
export const GetALLHotel=async(req,res,next)=>{
  const {min,max,...others}=req.query;
    try{
        const hotels= await Hotel.find({...others,cheapestPrice:{$gt:min||1,$lt:max||999}}).limit(req.query.limit);
        res.status(200).send(hotels); 
      }catch(error){
        next(error);
      }
}
export const GetHotel=async(req,res,next)=>{
    try{
        const hotel =await Hotel.findById(req.params.id);
       res.status(200).send(hotel); 
     }catch(error){
       next(error);
     }
}
export const CountByCity=async(req,res,next)=>{
  const cities=req.query.cities.split(",");
  try{
    const list=await Promise.all(cities.map((city)=>{
      return Hotel.countDocuments({city:city});
    }
    ))
     res.status(200).send(list); 
   }catch(error){
     next(error);
   }
}
export const CountByType=async(req,res,next)=>{
  try{
    const hotelCount=await Hotel.countDocuments({type:"hotel"});
    const apartmentCount=await Hotel.countDocuments({type:"apartment"});
    const resortCount=await Hotel.countDocuments({type:"resort"});
    const vilaCount=await Hotel.countDocuments({type:"vila"});
    const cabinCount=await Hotel.countDocuments({type:"cabin"});
     res.status(200).send([
      {type:"hotel",count:hotelCount},
      {type:"apartment",count:apartmentCount},
      {type:"resort",count:resortCount},
      {type:"vila",count:vilaCount},
      {type:"cabin",count:cabinCount},
     ]); 
   }catch(error){
     next(error);
   }
}



