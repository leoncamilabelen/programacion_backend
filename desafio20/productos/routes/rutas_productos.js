import router from 'koa-router'
import { ProductosControlador } from '../controller/controlador_productos.js'


export const routerProductos=router({prefix:'/api/productos'})

const controladorProductos= new ProductosControlador()

routerProductos.get('/:id?',controladorProductos.verProductos)

routerProductos.post('/',controladorProductos.guardarProductos)

routerProductos.delete('/:id',controladorProductos.eliminarProductos)

routerProductos.put('/:id',controladorProductos.modificarProducto) 