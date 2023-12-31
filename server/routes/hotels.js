import express from "express";
import { CountByCity, CountByType, createHotel, deleteHotel, GetALLHotel, GetHotel, updateHotel } from "../controllers/hotel.js";
import { getHotelRooms } from "../controllers/room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router=express.Router();
router.post("/", verifyAdmin,  createHotel);
router.put("/:id",verifyAdmin,  updateHotel);
router.delete("/:id",verifyAdmin, deleteHotel);
router.get("/find/:id",GetHotel);
router.get("/",GetALLHotel);
router.get("/countByCity",CountByCity);
router.get("/countByType",CountByType);
router.get("/room/:id",getHotelRooms);
export default router;