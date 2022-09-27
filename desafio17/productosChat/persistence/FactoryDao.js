import { ProductosDaoMongo } from "./productos/Dao/Dao_Productos_mongo.js";
import { ProductosDaoFake } from "./productos/Dao/Dao_Productos_fake.js";


export class DaoFactory {
    create(type) {
        if (type === 'mongo') { return ProductosDaoMongo.getInstance() }
        else if (type === 'fake') {  return ProductosDaoFake.getInstance() }
        else { console.error('error al conectar repositorio') }
    
    }
}