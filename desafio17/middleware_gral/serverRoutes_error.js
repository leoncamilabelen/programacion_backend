import winstonLogger from "../configuracionesGral/winston.js";

const infoRuta=(req,res,next)=>{
    winstonLogger.info(`ruta ${req.url}, método ${req.method}`)
    next()
}

const haySession=(req,res,next)=>{
    if (req.session.passport)next()
    else res.redirect('/login')

}


const errorRuta=(req, res,next) => {
    winstonLogger.warn(`ruta ${req.url}, método ${req.method} no implementada`)
    res.status(404).send({
        error: 404,
        descripción: `ruta ${req.url}, método ${req.method} no implementada`
    })}

const catchError=(error, req, res, next) => {
        winstonLogger.error(error.message)
        res.status(500).send(error.message);
    }

export default {errorRuta, catchError,infoRuta,haySession}