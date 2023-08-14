import express from "express";
import { CountByCity, CountByType, createHotel, deleteHotel, GetALLHotel, GetHotel, updateHotel } from "../controllers/hotel.js";
import { getHotelRooms } from "../controllers/room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router=express.Router();
//create hotel
//for creating controller -->>
router.post("/", verifyAdmin,  createHotel);
//update hotel
router.put("/:id",verifyAdmin,  updateHotel);
//delete hotel
router.delete("/:id",verifyAdmin, deleteHotel);
//get single hotel
router.get("/find/:id",GetHotel);
//get all hotels
//after calling the next it will go to the index.js(res.send())
router.get("/",GetALLHotel);
router.get("/countByCity",CountByCity);
router.get("/countByType",CountByType);
router.get("/room/:id",getHotelRooms);
export default router;