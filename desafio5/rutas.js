const express = require('express');
const ioServer = require('./socketIo');

const { Router } = express;
const router = Router();
const app = express()


app.use(express.static('./public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const arrayProductos = [{ "title": "pera", "price": 200, "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_pera-512.png", "id": 1 }, { "title": "manzana", "price": 100, "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_maca-256.png", "id": 2 }, { "title": "banana", "price": 150, "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_banana-256.png", "id": 3 }]

router.get('/', (req, res) => {
    let hayProductos = (arrayProductos.length === 0) ? false : true;
    res.render('productos', { arrayProductos, hayProductos, titulo: "Productos en existencia", headTitle: 'Productos' })

});

ioServer.on('connection', (socket) => {
    console.log('conectado');
})

router.post('/', (req, res) => {
    let id;
    if (arrayProductos.length === 0) id = 1
    else id = arrayProductos[arrayProductos.length - 1].id + 1;
    let productoNuevo = {
        title: req.body.nombre,
        price: req.body.precio,
        thumbnail: req.body.imagen,
        id: id
    };
    arrayProductos.push(productoNuevo);
    return false
});

app.use('/api/productos', router);

module.exports = app
