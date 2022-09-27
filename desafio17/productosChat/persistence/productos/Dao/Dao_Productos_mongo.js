import productosDataConfig from "../../../config_Product_chat/productosDataConfig.js";
import { MongoClient } from "../../mongo_cliente.js";

const { productosSchema, conexionProductos } = productosDataConfig

let instanceProductos=null

export class ProductosDaoMongo {
    constructor() {
        this.ProductoCliente =new MongoClient(conexionProductos, productosSchema)
    }

    static getInstance(){
        if (!instanceProductos) instanceProductos= new ProductosDaoMongo()
        return instanceProductos
    }

    async DaoVerProductos() {
        try {
            const dto = await this.ProductoCliente.getAll()
            return dto
        }
        catch (error) {
            console.log(error)
        }
    }

    async DaoGuardarProductos(newProductoDto) {
        try {
            const newProductSchema = this.ProductoCliente.model(newProductoDto)
            await this.ProductoCliente.addData(newProductSchema)
        }
        catch (error) {
            console.log(error)
        }
    }

}

//PRUEBA DE INSTANCIAS

/* const prueba1= ProductosDaoMongo.getInstance()
const prueba2= ProductosDaoMongo.getInstance()
console.log(prueba1===prueba2) */