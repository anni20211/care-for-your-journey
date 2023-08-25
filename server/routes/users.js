import express from "express";
import { deleteUser, GetALLUser, GetUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router=express.Router();
router.put("/:id",verifyUser,updateUser);
router.delete("/:id", verifyUser,deleteUser);
router.get("/:id",verifyUser,GetUser);
router.get("/",verifyAdmin,GetALLUser);

export default router;