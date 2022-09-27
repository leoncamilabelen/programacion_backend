

class ContenedorProductos{
    constructor(arrayProductos) {
        this.arrayProductos=arrayProductos
        
    }
   getById (paramId){
    let productoPorId = this.arrayProductos.filter(productoId => productoId.id === paramId)
    if (productoPorId.length === 0) return({"error": "producto no encontrado"})
    else return(productoPorId)
   }
 saveNewProduct(nombre,precio,imagen){
 let id;
    if (this.arrayProductos.length === 0) id = 1
    else id = this.arrayProductos[this.arrayProductos.length- 1].id + 1;
    let productoNuevo = {
        "title":nombre,
        "price":precio,
        "thumbnail":imagen,
        "id": id
    };
    this.arrayProductos.push(productoNuevo);
    return(this.arrayProductos);
}
changeProductById(paramId,nombre,precio,imagen){
    let indexPorId = this.arrayProductos.findIndex((producto) => producto.id == paramId);
    (nombre) ? this.arrayProductos[indexPorId].title = nombre : null;
    (precio) ? this.arrayProductos[indexPorId].price = precio : null;
    (imagen) ? this.arrayProductos[indexPorId].thumbnail = imagen : null;
    return (this.arrayProductos)
}
deleteById(paramId){
    this.arrayProductos = this.arrayProductos.filter((producto) => producto.id != paramId)
    
}

}

module.exports =ContenedorProductos