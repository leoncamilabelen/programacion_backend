import fakerProd from "../../../mock/fakerProd.js";
import { FakeClient } from "../../fake_cliente.js";

const productos = fakerProd.fakeProductos


let instanceProductosFake=null

export class ProductosDaoFake {
    constructor() {
        this.ProductoCliente = new FakeClient(productos)
    }

    static getInstance(){
        if (!instanceProductosFake) instanceProductosFake= new ProductosDaoFake()
        return instanceProductosFake
    }

    DaoVerProductos() {
        const dto = this.ProductoCliente.getAll()
        return dto


    }

    DaoGuardarProductos(newProducto) {

        this.ProductoCliente.addData(newProducto)

    }

}