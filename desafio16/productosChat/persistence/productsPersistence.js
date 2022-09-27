import fakerProd from "../mock/fakerProd.js";

const productos= fakerProd.fakeProductos

export class ProductosContainer {
    constructor() {
        this.productos=productos
    }
    getAll() {
        return this.productos
    }
    addData(newObject) {
        this.productos.push(newObject)
    }
}
