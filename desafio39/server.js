import { config } from "dotenv";
import express from "express";
//import rutas
import { productRouter } from "./productosChat/routes.js";
import { registroRouter } from "./login_y_registro/registro/routes.js";
import { numerosRandomRouter } from "./numerosRandom/routes.js";
import { infoRouter } from "./info/routes.js";
import { loginRouter } from "./login_y_registro/login_logout/routes.js";
import serverRoutes_error from "./middleware_gral/serverRoutes_error.js";
//
import cookieParser from "cookie-parser";
import path from 'path'
import parseArgs from "minimist"
import cluster from "cluster";
import os from "os"
import compression from "compression";
import passport from "./login_y_registro/middleware/passportMid.js";

//import config
import { sessionConMongo } from "./configuracionesGral/mongoSession.js";
import {hbsEngine} from './configuracionesGral/engineHbs.js'
import { Server as HttpServer } from "http";
import { Server as IoServer } from "socket.io";
import { serverIo } from "./productosChat/controller.js";
// argumentos
const numCPU = os.cpus().length
const args = parseArgs(process.argv.slice(2), { alias: { 'p': 'port' }, default: { 'port': 8080, 'modo': 'FORK' } })
const PORT = args.port

const app = express();
const httpServer = new HttpServer(app);
const ioServer = new IoServer(httpServer);

config()
//mid 
app.use(compression())

app.use(express.static("./public"))

app.use(cookieParser())

app.use(serverRoutes_error.infoRuta)

//conexión con session store
app.use(sessionConMongo)


//hbs
app.engine("hbs", hbsEngine)
app.set("views", path.resolve("public", "views_hbs"));
app.set("view engine", "hbs");
//datos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//passport
app.use(passport.initialize());
app.use(passport.session());

serverIo(ioServer)

 if (args.modo == 'CLUSTER' && cluster.isPrimary) {
        for (let i = 0; i < numCPU; i++) {
            cluster.fork()
        }
    } else { 
//rutas
app.use('/registro', registroRouter)
app.use('/login', loginRouter)
app.use('/productos', productRouter)
app.use('/random', numerosRandomRouter)
app.use('/info', infoRouter)
//errores
app.use(serverRoutes_error.errorRuta)
app.use(serverRoutes_error.catchError);


        httpServer.listen(PORT, () => {
            console.log(`Escuchando en el puerto ${httpServer.address().port}`);
        });
        httpServer.on("error", (error) => console.error(error, "error de conexión"));
    }
