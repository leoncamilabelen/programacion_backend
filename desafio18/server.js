import express from "express";
import { routerProductos } from "./productos/routes/rutas_productos.js";


export const app = express()
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/productos', routerProductos)


app.listen(8080,console.log('conectado'))