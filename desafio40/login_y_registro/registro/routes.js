import {Router} from 'express'
import passport from '../middleware/passportMid.js'
import controller from './controller.js'

export const registroRouter=Router()


registroRouter.get("/", controller.getRegistro)

registroRouter.post("/", passport.authenticate('registro', { failureRedirect: 'registro/error_registro' }), controller.postRegistro)

registroRouter.get("/error_registro", controller.getErrorRegistro)