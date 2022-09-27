import { Router } from "express"
import serverRoutes_error from "../middleware_gral/serverRoutes_error.js"

export const productRouter = Router()

//mid
productRouter.use(serverRoutes_error.haySession)

//rutas
productRouter.get("/",(req,res)=>{
    const nombre=req.session.passport.user
    res.render("index.hbs",{nombre,titulo:"productos"})}
)

