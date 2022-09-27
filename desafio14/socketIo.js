
import { productsData } from './contenedor/contenedorProductos.js';
import { mensajesData } from "./contenedor/contenedorChat.js";


export const serverIo=(ioServer)=>{
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
}