import fs from 'fs'



export class ArchivoPersistencia {
    constructor(urlProducts) {
        this.urlProducts = urlProducts;
    }
    async agregarProducto(product) {
    try{
        await fs.promises.writeFile(this.urlProducts,product);
    }catch(error){
        console.log(error)
    }
    };

    async verProductos() {
        try {
            const product = await fs.promises.readFile(this.urlProducts, 'utf-8');
            return  product;
        }
        catch (err) {
            console.log(err)
        }
    }
    /* async createAdd(newProduct) {
        let id;
        const time = new Date();
        let timestamp = `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
        try {
            let productos = await this.read();
            id = await crearId(this.read())
            let nuevoObjeto = { ...newProduct, id, timestamp }
            productos = [...productos, nuevoObjeto]
            await this.write(productos)
        }
        catch (err) {
            console.log(err)
            await this.write([{ ...newProduct, "id": 1, timestamp }])
        }
    }

    async delete(id) {
        try {
            let productos = await this.read()
            let resultado = productos.filter(element => element.id !== Number(id))
            await this.write(resultado)
            return ("Elemento Eliminado")
        }

        catch (err) {
            console.log(err)
        }
    }; */
}; 