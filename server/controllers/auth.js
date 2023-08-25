import User from "../models/User.js";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import { createError } from "../utils/error.js";
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(200).json("User has been successfully created");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user =await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "user not found"));
    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword) return next(createError(400, "wrong usename or password"));
    const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SECRET_KEY);
    const {password,isAdmin,...otherDatails}=user._doc;
    res.cookie("access_token",token,{
      httpOnly:true,
    }).status(200).json({details:{...otherDatails},isAdmin});
  } catch (error) {
    next(error);
  }
};
