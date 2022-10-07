import { ProductoServicios } from "../service/servicios_productos.js";
const productos = new ProductoServicios()

export class ProductosControlador {
    constructor() {
    }

    async verProductos(ctx) {
        const id = ctx.request.params.id
        let titulo;
        if (!id) titulo = 'Productos disponibles'
        else { titulo = 'Producto elegido' }
        try {
            let products = await productos.verProductos(id);
            await ctx.render('index', { products, titulo })

        } catch (error) {
            console.log(error)
        }
    }

    async guardarProductos(ctx) {
        const body = ctx.request.body
        console.log(body)
        try {
            await productos.guardarProductos(body)
            await ctx.redirect('/api/productos')
        } catch (error) {
            console.log(error)
        }
    }

    async eliminarProductos(ctx) {
        try {
            const id = ctx.request.params.id
            const eliminado = await productos.eliminarProducto(id)
            ctx.body=eliminado
        } catch (error) {
            console.log(error)
        }
    }

    async modificarProducto(ctx) {
        const body = ctx.request.body
        const id = ctx.request.params.id
        try {
            const productoModificado = await productos.modificarProducto(id, body)
            ctx.body=productoModificado
        } catch (error) {
            console.log(error)
        }
    }
}