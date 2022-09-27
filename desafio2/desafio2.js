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
        try{
        let agregar = await fs.promises.writeFile(this.nombre, JSON.stringify(texto))
        return agregar}
        catch (err){
            console.error(err)
        }
    }
    async getAll() {
        try {
            let prod = await fs.promises.readFile(this.nombre, 'utf-8')
            return (prod)
        }
        catch (err) {
            console.error(err)
        }
    }
    async save(objeto) {
        let id = 0
        let productos = [];
        try {
            let product = await this.getAll()
            if (product === "") {
                id = 1
            }
            else {
                productos = JSON.parse(product);
                id = productos[productos.length - 1].id + 1
            };
            let nuevoObjeto = { ...objeto, id }
            productos = [...productos, nuevoObjeto]
            this.write(productos)
            console.log(nuevoObjeto.id)
        }
        catch (err) {
            this.write([{ ...objeto, "id": 1 }])
            console.error (`${err} SE CREO UN NUEVO ARCHIVO con el nombre ${this.nombre}`)
        }
    }
    async getById(id) {
        try {
            let productos = JSON.parse(await this.getAll())
            let resultado = productos.filter(element => element.id === id)
            console.log(resultado)
        }
        catch (err) {
            console.error(err)
        }

    }

    async deleteAll() {
        try {
            await this.write([])
            console.log("Archivo Vacío")
        }
        catch (err) {
            console.error(err)
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
            console.error(err)
        }
    }
}
//let uva = new Productos("uva", 50, "https://api.lorem.space/image/movie?w=150&amp;amp;amp;amp;h=220")
const products = new Contenedor("./productos.txt")
//products.getById(2)
//products.save(uva)
//products.deleteById(5)
//products.deleteAll()