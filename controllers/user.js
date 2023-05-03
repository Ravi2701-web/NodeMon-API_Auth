import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";

export const getAllUsers = async (req, res) => {};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });

  sendCookie(user, res, `Welcome back, ${user.name}`, 200);
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user)
    return res.status(404).json({
      success: false,
      message: "User Already Exists",
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  sendCookie(user, res, "Registered Succesfullo Woolaa !!1", 201);
};

export const getMyProfile = (req, res) => {
  /* const { token } = req.cookies;

  const user = await User.findById(id);

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Login First",
    });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("Decoded Token is", decoded);*/
  //const user = await User.findById(decoded._id);
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

//Repetitive Code

/* const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message: "User Registered Successfully !!",
    });
}; */

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "Logged out !!",
      user: req.user,
    });
};

//Previos Lecture Notes

/*export const getAllUsers = async (req, res) => {
  const users = await User.find({});

  console.log("Query Params are", req.query.keyword);
  res.json({
    success: true,
    users,
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });
  res.cookie("tempi", "lol").json({
    success: true,
    message: "Registered successfully !!",
  });
};

export const getUserDetails = async (req, res) => {
  //Qeury are { id: '644f9b117214b21383195201' } when http://localhost:4000/userid?id=644f9b117214b21383195201
  // const { id } = req.query;
  const { id } = req.params;

  //console.log("Qeury are", req.query);
  console.log("Params are", req.params); //Params are { id: '644f9b117214b21383195201' } when http://localhost:4000/userid/644f9b117214b21383195201
  const user = await User.findById(id);
  res.json({
    success: true,
    user,
  });
};
*/
