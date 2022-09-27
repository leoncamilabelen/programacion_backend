import { Productos } from "./productos.js"
import parseArgs from "minimist"
import { DaoFactory } from "../FactoryDao.js"


const argType=parseArgs(process.argv.slice(2), { alias: { 't': 'type' }, default: { 'type': 'mongo'} })

const type=argType.type
console.log(type)
const factoryDao= new DaoFactory().create(type)

export class ProductosRepository{
    constructor(){
        this.dao=factoryDao
    }
 async crearId(){
    let id= 1
    const arrayProductos= await this.verProductos()
    if(arrayProductos.length>0){
        const i= arrayProductos.length-1
     id =Number(arrayProductos[i].id)+1 
    }
    return id
    }


  async verProductos (){
    try{
    const dto= await this.dao.DaoVerProductos()
    const productos=Productos.productosDesdeDto(dto)
    return productos
  }
  catch(error){
    console.log(error)
  }
  }
  async guardarProductos(newProductos){
   try{
    const {title,price,thumbnail}=newProductos
    const id=await this.crearId()
    const newDto = new Productos(id,title,price,thumbnail);
    const dto = newDto.productosADto()
    await this.dao.DaoGuardarProductos(dto)
  }
  catch(error){
    console.log(error)
  }
}
}