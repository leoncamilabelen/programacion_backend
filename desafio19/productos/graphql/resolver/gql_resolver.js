import { ProductoServicios } from "../../service/servicios_productos.js";

const resolveGQL = new ProductoServicios()

export const verProductos = async (arg) => {
    try {
        const {id}=arg
        return await resolveGQL.verProductos(id)

    } catch (error) {
        console.log(error)
    }
}
export const agregarProducto = async (arg) => {
    try {
        return await resolveGQL.guardarProductos(arg)

    } catch (error) {
        console.log(error)
    }
}


export const modificarProducto = async ( arg) => {
    try {
        const {id, nombre, precio, imagen } = arg
        const body = { nombre, precio, imagen }
        return await resolveGQL.modificarProducto(id, body)

    } catch (error) {
        console.log(error)
    }
}

export const eliminarProducto = async (arg) => {
    try {
        const { id } = arg
        return await resolveGQL.eliminarProducto(id)

    } catch (error) {
        console.log(error)
    }
}

