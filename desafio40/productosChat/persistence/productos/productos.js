export class Productos {
    constructor(id,title,price,thumbnail){
        this.id=id;
        this.title=title
        this.price=price
        this.thumbnail=thumbnail

    }
    static productosDesdeDto(dto) {
        const productos = [];

        dto.map((e) => {
            const prod = new Productos(e.id,e.title,e.price,e.thumbnail)
            productos.push(prod)
        })
        return productos
    }
    productosADto() {
        const { id,title,price,thumbnail } = this
        return {
            id,
            title,
            price,
            thumbnail
        }
    }

}