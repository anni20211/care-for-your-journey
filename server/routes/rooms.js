import express from "express";
import { createRoom, deleteRoom, GetALLRoom, GetRoom, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router=express.Router();

router.post("/:hotelid", verifyAdmin,  createRoom);
//update Room
router.put("/:id",verifyAdmin,  updateRoom);
router.put("/availability/:id",  updateRoomAvailability);
//delete Room
router.delete("/:id/:hotelid",verifyAdmin, deleteRoom);
//get single Room
router.get("/:id",GetRoom);
//get all Rooms
//after calling the next it will go to the index.js(res.send())
router.get("/",GetALLRoom);

export default router;