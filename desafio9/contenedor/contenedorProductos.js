import  {generarProductosFake} from "../logica/mock.js"


class ProductosContainer {
    constructor(cant) {
        this.productosFake = generarProductosFake(cant)
        this.productos = this.productosFake;
    }
    getAll() {
        return this.productos
    }
    addData(newObject) {
        const id=this.productos[this.productos.length-1].id+1;
        const newProduct={...newObject,id}
        this.productos.push(newProduct)
    }

}

export const productsData = new ProductosContainer()