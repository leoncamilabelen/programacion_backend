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

}; 