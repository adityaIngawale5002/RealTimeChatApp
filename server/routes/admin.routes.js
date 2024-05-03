import express from "express";
import { adminOnly, isAuthenticated } from "../middleware/auth.middleware.js";
import { adminLogin, allChats, allMessages, allUSer, getDashboardStats,adminLogout,getAdminData } from "../controller/admin.controller.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";
export const router=express();




router.route("/verify").get(adminLoginValidator(),validateHandler,adminLogin)

router.route('/logout').get(adminLogout)


//only admn can this routes
router.use(adminOnly)

router.route('/').get(getAdminData);

router.route('/users').get(isAuthenticated,allUSer)

router.route('/chats').get(isAuthenticated,allChats)

router.route('/messages').get(allMessages)

router.route('/stats').get(getDashboardStats);


