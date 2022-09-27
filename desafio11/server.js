import express from "express";
import { Server as HttpServer } from "http";
import { Server as IoServer } from "socket.io";
import { engine } from "express-handlebars";
import { productsData } from './contenedor/contenedorProductos.js';
import { mensajesData } from "./contenedor/contenedorChat.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo"; 
import path from 'path'
import passport from "./passport.js";
import routes from "./routes/routes.js";
const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true }

export const app = express();
app.use(express.static("./public"))
app.use(cookieParser())

app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://JuanLogrono:Juan1234@cluster0.nrbeoop.mongodb.net/?retryWrites=true&w=majority`,
        mongoOptions: advanceOptions
    }),
    secret: 'secreto',
    resave: true,
    rolling:true,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
})) 


const httpServer = new HttpServer(app);
const ioServer = new IoServer(httpServer);

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        
    })
);
app.set("views", path.resolve("public", "views_hbs"));
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/registro", routes.getRegistro)
app.post("/registro",passport.authenticate('registro',{failureRedirect:'/error_registro'}),routes.postRegistro)
app.get("/error_registro",routes.getErrorRegistro)


app.get("/login",routes.getLogin)
app.post("/login",passport.authenticate('auth',{failureRedirect:'/error_login'}),routes.postLogin)
app.get("/error_login", routes.getErrorLogin)


app.get("/",routes.getProductos)

app.get("/logout",routes.getLogout)

ioServer.on("connection", async (socket) => {
    console.log("conectado");
    socket.emit("productos", productsData.getAll())
    socket.emit("mensajes", await mensajesData.getAll());

    socket.on("newProduct", (newProduct) => {
        productsData.addData(newProduct);
        ioServer.sockets.emit("productos", productsData.getAll());
    });
    socket.on("newMessage", async (newMessage) => {
        await mensajesData.addData(newMessage);
        ioServer.sockets.emit("mensajes", await mensajesData.getAll());
    });
}); 

app.use((error, req, res, next) => {
    res.status(500).send(error.message);
  });

const PORT = 8080;
httpServer.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${httpServer.address().port}`);
});
httpServer.on("error", (error) => console.error(error, "error de conexión"));

