import express from "express";
import { routerProductos } from "./productos/routes/rutas_productos.js";
import {gqlRouter} from "./productos/graphql/routes_gql/gql_rutas.js"


export const app = express()
app.use(express.static('./public'));
app.use(express.json());
app.use(gqlRouter)
app.use('/api/productos', routerProductos)


app.listen(8080,console.log('conectado'))