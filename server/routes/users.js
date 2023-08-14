import express from "express";
import { deleteUser, GetALLUser, GetUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router=express.Router();
// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("hello user,you are logged in"); 
// });

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello user,you are logged in and you can delete your account"); 
// });
// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("hello admin,you are logged in and you can delete all accounts"); 
// });
//update User
router.put("/:id",verifyUser,updateUser);
//delete User
router.delete("/:id", verifyUser,deleteUser);
//get single User
router.get("/:id",verifyUser,GetUser);
//get all Users
//after calling the next it will go to the index.js(res.send())
router.get("/",verifyAdmin,GetALLUser);

export default router;