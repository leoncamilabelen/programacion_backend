const express = require('express');
const Contenedor = require('./controllers/products')
const random = require('random')

const app = express()

const products = new Contenedor("./productos.txt")
const PORT = 8080


const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.error(error))


let arrayProductos = []
const verArray = products.getAll()
verArray.then((response) => { arrayProductos = JSON.parse(response) })

app.get('/', (req, res) => {
    res.send("Desafío 3")
})

app.get('/productos', (req, res) => {
    res.send(arrayProductos)
})
app.get('/productoRandom', (req, res) => {
    let nroRandom = random.integer(0, arrayProductos.length - 1)
    res.send(arrayProductos[nroRandom])

});

