import { ProductosRepository } from "../persistence/productos/productos_repository.js";



const productsData= new ProductosRepository()

const mostrarProductos=async ()=>await productsData.verProductos()

const guardarProductos=async (newProduct)=>await productsData.guardarProductos(newProduct)


export default {mostrarProductos,guardarProductos}