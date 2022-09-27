import express from 'express'
import { ProductosControlador } from '../controller/controlador_productos.js'

//TODO const {Router}= express

export const routerProductos= express.Router()

const controladorProductos=new ProductosControlador()

routerProductos.get('/:id?',controladorProductos.verProductos)

routerProductos.post('/',controladorProductos.guardarProductos)

routerProductos.delete('/:id',controladorProductos.eliminarProductos)

routerProductos.put('/:id',controladorProductos.modificarProducto)