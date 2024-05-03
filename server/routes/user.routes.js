import express  from "express";
import { login, signup ,getUserProfile,logout,searchUser, sendRequest, acceptRequest,getNotification, getMyfriends} from "../controller/user.controller.js";
import { singleAvatar } from "../middleware/multer.middleware.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { acceptValidator, loginvalidator, signupvalidator,  validateHandler } from "../lib/validators.js";


export const router=express();


router.route("/signup").post(singleAvatar,signupvalidator(),validateHandler,signup);
router.route("/login").post(loginvalidator(),validateHandler,login);



router.route("/getProfile").get(isAuthenticated,getUserProfile);
router.route("/logout").get(isAuthenticated,logout);
router.route("/search").get(isAuthenticated,searchUser);
router.route("/request").put(isAuthenticated,validateHandler,sendRequest);

router.route("/acceptRequest").post(isAuthenticated,acceptValidator(),validateHandler,acceptRequest)

router.route("/notification").get(isAuthenticated,getNotification)
router.route("/friends").get(isAuthenticated,getMyfriends)
