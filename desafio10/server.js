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
const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const app = express();
app.use(express.static("./public"));

app.use(cookieParser())

app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://JuanLogrono:Juan1234@cluster0.nrbeoop.mongodb.net/?retryWrites=true&w=majority`,
        mongoOptions: advanceOptions
    }),
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
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



app.get('/log_in', (req, res) => {
    res.render('log.hbs',{in:true,titulo:"log in"})
})

app.get('/log_out', (req, res) => {
   const nombre=req.session.nombre
   req.session.destroy(err=>{
    if(err) console.log(err)
   })
    res.render("log.hbs",{nombre,in:false,titulo:"log out"})
})
app.post('/', (req, res) => {
    req.session.nombre = req.body.nombre
    res.redirect('/')
})


app.get('/', (req, res) => {
    if (req.session.nombre){
    const nombre=req.session.nombre
    res.render("index.hbs",{nombre,titulo:"productos"})}
    else
    res.redirect('/log_in')
})
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



const PORT = 8080;
httpServer.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${httpServer.address().port}`);
});
httpServer.on("error", (error) => console.error(error, "error de conexión"));

