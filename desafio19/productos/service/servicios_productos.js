import { ArchivoDaoProductos } from "../persistence/dao/dao_Productos.js";


export class ProductoServicios {
    constructor() {
        this.productos = new ArchivoDaoProductos()
    }
    async crearID() {
        let id = 0
        try {
            let productos = await this.productos.verProductos()
            if (productos.length === 0) id = 1
            else id = Number(productos[productos.length - 1].id) + 1;
            return id
        }
        catch (error) {
            console.log(error)
        }
    }
    async validarProducto(id) {
        try {
            const validarId = await this.productos.verProductos()
            const valido = validarId.findIndex(e => e.id == id);
            return valido
        } catch (error) {
            console.log(error)
        }
    }
    async verProductos(id) {
        let respuesta;
        try {
            if (!id) {
                respuesta = await this.productos.verProductos()
            } else {
                respuesta = await this.productos.verProductosPorId(id)
            }
            return respuesta
        } catch (error) {
            console.log(error)
        }
    }

    async guardarProductos(bodyProduct) {
        try {
            const id = await this.crearID()
            const { nombre, precio, imagen } = bodyProduct
            const newProduct = { id, nombre, precio, imagen }
            const saveProduct = await this.productos.verProductos()
            saveProduct.push(newProduct)
            await this.productos.guardarProductos(saveProduct)
            return newProduct
        } catch (error) {
            console.log(error)
        }
    }

    async eliminarProducto(id) {
        try {
            let i = await this.validarProducto(id)
            if (i < 0) return "producto inexistente"
            else {
                let productos = await this.productos.verProductos()
                let resultado = productos.filter(element => element.id !== Number(id))
                await this.productos.eliminarProducto(resultado)
                return productos[i] 
            }
        } catch (error) {
            console.log(error)
        }
    }

    async modificarProducto(id, body) {
        try {
            let i = await this.validarProducto(id)
          
            if(i<0) return "producto inexistente"
            else {
                const allProducts= await this.productos.verProductos();
                (body.nombre) ? allProducts[i].nombre = body.nombre : null;
                (body.imagen) ? allProducts[i].imagen = body.imagen : null;
                (body.precio) ? allProducts[i].precio = body.precio : null;
                 await this.productos.guardarProductos(allProducts)
                return allProducts[i]
            } 
        } catch (error) {
            console.log(error)
        }
    }
}