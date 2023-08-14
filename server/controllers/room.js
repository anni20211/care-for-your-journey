import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom=async(req,res,next)=>{
    const hotelid=req.params.hotelid;
    const newRoom=new Room(req.body);
    try {
       const savedRoom= await newRoom.save();
       try {
        await Hotel.findByIdAndUpdate( hotelid, {$push:{rooms:savedRoom._id}} )
       } catch (error) {
        next(error);
       }
       res.status(200).json(savedRoom);
    } catch (error) {
        next(error);
    }
}
export const updateRoom=async(req,res,next)=>{
    try{
        const updatedRoom= await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).send(updatedRoom); 
      }catch(error){
        next(error);
      }
}
export const updateRoomAvailability=async(req,res,next)=>{
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
}

export const deleteRoom=async(req,res,next)=>{
    const hotelid=req.params.hotelid;
    try{
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate( hotelid, {$pull:{rooms:req.params.id}} )
           } catch (error) {
            next(error);
           }
       res.status(200).send("deleted successfully"); 
     }catch(error){
       res.status(500).send(err);
     }
}
export const GetALLRoom=async(req,res,next)=>{
    try{
        const rooms= await Room.find();
        res.status(200).send(rooms); 
      }catch(error){
        next(error);
      }
}
export const GetRoom=async(req,res,next)=>{
    try{
        const room =await Room.findById(req.params.id);
       res.status(200).send(room); 
     }catch(error){
       next(error);
     }
}
export const getHotelRooms=async(req,res,next)=>{
  try{
    const hotel=await Hotel.findById(req.params.id);
   const list= await Promise.all(hotel.rooms.map(room=>{
    return Room.findById(room);
   }
      ))
      res.status(200).json(list);
  }
  catch(err){ 
    next(err);
  }
}
