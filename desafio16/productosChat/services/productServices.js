import { ProductosContainer } from "../persistence/productsPersistence.js";


const productsData= new ProductosContainer()

const mostrarProductos=()=> productsData.getAll()

const guardarProductos=(newProduct)=>{
    const arrayProductos=mostrarProductos()
    const id=arrayProductos[arrayProductos.length-1].id+1;
    const newObject={...newProduct,id}
    productsData.addData(newObject)
}

export default {mostrarProductos,guardarProductos}