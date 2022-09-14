import chatService from "./services/chatService.js";
import productServices from "./services/productServices.js";



export const serverIo=(ioServer)=>{
    ioServer.on("connection", async (socket) => {
        console.log("conectado");
        //socket productos
        socket.emit("productos",await productServices.mostrarProductos() )
        socket.on("newProduct",async (newProduct) => {
            await productServices.guardarProductos(newProduct);
            ioServer.sockets.emit("productos",await productServices.mostrarProductos());
        });
        //socket mensajes
        socket.emit("mensajes", await chatService.mostrarMensajes());
        socket.on("newMessage", async (newMessage) => {
            await chatService.guardarMensaje(newMessage);
            ioServer.sockets.emit("mensajes", await chatService.mostrarMensajes());
        });
    });
    }

  
