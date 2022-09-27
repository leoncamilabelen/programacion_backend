import { ProductoServicios } from "../service/servicios_productos.js";
const productos = new ProductoServicios()

export class ProductosControlador {
    constructor() {
    }

    async verProductos(req, res) {
        const id = req.params.id;
        try {
            const products = await productos.verProductos(id);
            res.send(products)

        } catch (error) {
            console.log(error)
        }
    }

    async guardarProductos(req, res) {
        const body = req.body
        try {
            const newProduct = await productos.guardarProductos(body)
            res.send(newProduct)
        } catch (error) {
            console.log(error)
        }
    }

    async eliminarProductos(req, res) {
        const id = req.params.id
        try {
            const eliminado = await productos.eliminarProducto(id)
            res.send(eliminado)
        } catch (error) {
            console.log(error)
        }
    }

    async modificarProducto(req,res){
        const body=req.body
        const id = req.params.id
        try {
          const productoModificado= await productos.modificarProducto(id,body)
          res.send(productoModificado)            
        } catch (error) {
            console.log(error)
        }
    }
}