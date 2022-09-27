import { ArchivoPersistencia } from "../persistencia.js";


export class ArchivoDaoProductos {
    constructor() {
        this.productos = new ArchivoPersistencia('public/productos.json')
    }

    async verProductos() {
        try {
            let productos = JSON.parse(await this.productos.verProductos())
            return (productos.length === 0) ? "no hay productos" : productos

        } catch (error) {
            console.log(error)
        }
    }

    async verProductosPorId(id) {
        try {
            const productFind =JSON.parse( await this.productos.verProductos())
            let productos = productFind.filter((e) => e.id == id);
            return (productos.length<1) ? "producto inexistente" : productos;

        } catch (error) {

            console.log(error)
        }
    }


    async guardarProductos(newProduct){
        try {
            const newProductString=JSON.stringify(newProduct)
            await this.productos.agregarProducto(newProductString)
        } catch (error) {
            console.log(error)
        }

    }

    async eliminarProducto(newSave) {
        try {
            const resultado=JSON.stringify(newSave)
            await this.productos.agregarProducto(resultado)
            
        }

        catch (err) {
            console.log(err)
        }
    }
 
}
