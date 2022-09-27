import express from "express";
import { Server as HttpServer } from "http";
import { Server as IoServer } from "socket.io";
import { engine } from "express-handlebars";
import { productsData } from "./datos/productsData.js";
import { mensajesData } from "./datos/chatData.js";
const app = express();
app.use(express.static("./public"));

const httpServer = new HttpServer(app);
const ioServer = new IoServer(httpServer);

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("views", "/views_hbs");
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.html");
});

ioServer.on("connection", async (socket) => {
  console.log("conectado");
  socket.emit("productos", await productsData.getAll());
  socket.emit("mensajes", await mensajesData.getAll());
  socket.on("newProduct", async (newProduct) => {
    await productsData.addData(newProduct);
    ioServer.sockets.emit("productos", await productsData.getAll());
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
