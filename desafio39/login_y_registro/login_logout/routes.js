import express from "express";
import passport from "../middleware/passportMid.js";
import controller from "./controller.js";
import middleware_gral from "../../middleware_gral/serverRoutes_error.js"
const {Router}=express
export const loginRouter=Router();
const {haySession}=middleware_gral
loginRouter.get("/",controller.getLogin)

loginRouter.post("/", passport.authenticate('auth', { failureRedirect: 'login/error_login' }),controller.postLogin)

loginRouter.get("/error_login",controller.getErrorLogin)

loginRouter.get("/logout",haySession, controller.getLogout)
