const express = require('express');
let ContenedorProductos = require('./controllers/productos');
const { Router } = express;


const arrayProductos = [{ "title": "pera", "price": 200, "thumbnail": "https://api.lorem.space/image/movie?w=150&amp;amp;amp;amp;h=220", "id": 1 }, { "title": "manzana", "price": 100, "thumbnail": "https://api.lorem.space/image/movie?w=150&amp;amp;amp;amp;h=220", "id": 2 }, { "title": "banana", "price": 150, "thumbnail": "https://api.lorem.space/image/movie?w=150&amp;amp;amp;amp;h=220", "id": 3 }]
const productos = new ContenedorProductos(arrayProductos)

const app = express()
const router = Router()

app.use(express.static(__dirname + '/public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.send(productos)
});

router.get('/:id', (req, res) => {
    let paramId = Number(req.params.id)
   res.send(productos.getById(paramId))
});

router.post('/', (req, res) => {
    let nombre = req.body.nombre;
    let precio = req.body.precio;
    let imagen = req.body.imagen;
    res.send(productos.saveNewProduct(nombre, precio, imagen));
});

router.put('/:id', (req, res) => {
    let paramId = req.params.id;
    let nombre = req.body.nombre; 
    let precio = req.body.precio ;
    let imagen = req.body.imagen ;
    res.send(productos.changeProductById(paramId,nombre,precio,imagen))
});

router.delete("/:id", (req, res) => {
    let paramId = parseInt(req.params.id);
    productos.deleteById(paramId)
    res.send(`Producto ${paramId} eliminado correctamente`)
});


const PORT = 8080
app.use('/api/productos', router);

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.error(error, "error de conexión"));