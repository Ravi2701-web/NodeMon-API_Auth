import express from "express";

import { getAllUsers, logout } from "../controllers/user.js";
import { register } from "../controllers/user.js";

import { getMyProfile, login } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);
export default router;

//Notes -------

//router.route("/userid/:id").get(getMyProfile);

//router.get("/userid/special", specialFunc);

//router.get("/userid/:id", getUserDetails);
//router.put("/userid/:id", updateUser);
//router.delete("/userid/:id", deleteUser);
