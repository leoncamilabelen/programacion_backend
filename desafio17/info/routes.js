import { Router } from "express";
import serverRoutes_error from "../middleware_gral/serverRoutes_error.js";
import controller from "./controller.js";

export const infoRouter = Router()

//mid
infoRouter.use(serverRoutes_error.haySession)

//rutas
infoRouter.get('/',controller.getInfo)