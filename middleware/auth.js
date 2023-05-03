import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  //console.log(token);
  if (!token)
    return res.status(404).json({
      success: false,
      message: "Login First",
    });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);

  next();
};

// Imp Note- We can pass either value req.user or user, if we are passing
//user then it is like step below else otherwise.

//req.user = await User.findById(decoded._id);

//If we want user to be passed here then below code -

// const user = await User.findById(decoded._id);
// res.status(200).json({
//  success: true,
// user,
//  //user: req.user,
// });
//next();
//console.log("Decoded Token is", decoded);
//};
