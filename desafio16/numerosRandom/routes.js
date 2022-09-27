import { Router } from "express"
import serverRoutes_error from "../middleware_gral/serverRoutes_error.js"
import controller from "./controller.js"

export const numerosRandomRouter=Router()
//mid
//numerosRandomRouter.use(serverRoutes_error.haySession)

numerosRandomRouter.get('/',controller.generarNumeros)