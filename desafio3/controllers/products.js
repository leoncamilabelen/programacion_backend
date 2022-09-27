const fs = require('fs');

class Productos {
    constructor(titulo, precio, thumbnail) {
        this.title = titulo;
        this.price = precio;
        this.thumbnail = thumbnail
    }
}


class Contenedor {
    constructor(nombre) {
        this.nombre = nombre;
    }
    async write(texto) {
        let agregar =await fs.promises.writeFile(this.nombre, JSON.stringify(texto))
        return agregar
    }
    async getAll() {
        try {
            let prod = await fs.promises.readFile(this.nombre, 'utf-8')
            return (prod)
        }
        catch (err) {
            console.log(err)
        }
    }
    async save(objeto) {
        let id = 0
        let productos
        try {
            let product = await this.getAll()
            if (product === "") productos = []
            else productos = JSON.parse(product);

            if (productos.length === 0) id = 1
            else id = productos[productos.length - 1].id + 1;
            let nuevoObjeto = { ...objeto, id }
            productos = [...productos, nuevoObjeto]
            this.write(productos)
            console.log(nuevoObjeto.id)
        }
        catch (err) {
            console.log(err)
            this.write([{ ...objeto, "id": 1 }])
        }
    }
    async getById(id) {
        let resultado
        try {
            let productos = JSON.parse(await this.getAll())
             resultado = productos.filter(element => element.id === id)
             return  resultado
            }
            catch (err) {
                console.log(err)
            }

    }

    async deleteAll() {
        try {
            await this.write([])
            console.log("Archivo Vacío")
        }
        catch (err) {
            console.log(err)
        }
    }

    async deleteById(id) {
        try {
            let productos = JSON.parse(await this.getAll())
            let resultado = productos.filter(element => element.id !== id)
            this.write(resultado)
            console.log("Elemento Eliminado")
        }

        catch (err) {
            console.log(err)
        }
    }
}


module.exports= Contenedor