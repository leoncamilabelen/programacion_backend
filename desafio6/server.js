const express=require( 'express');
const { Server:HttpServer } = require ('http');
const { Server:IoServer } =require ('socket.io');
const { promises } =require ('fs');
const { engine } =require ('express-handlebars');

const app = express()

const httpServer = new HttpServer(app);
const ioServer = new IoServer(httpServer);

app.use(express.static(__dirname+'/public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const arrayProductos = [{ "title": "pera", "price": 200, "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_pera-512.png", "id": 1 }, { "title": "manzana", "price": 100, "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_maca-256.png", "id": 2 }, { "title": "banana", "price": 150, "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_banana-256.png", "id": 3 }]
let arrayMensajes = [];

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
    })
);
app.set('views', './public/views_hbs');
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
   res.render('productos')
});

ioServer.on('connection',async  (socket) => {
    console.log('conectado');
    socket.emit('productos', arrayProductos)
    socket.emit('mensajes', await getMensajes())

    socket.on('newProduct', (newProduct) => {
        arrayProductos.push(newProduct);
        ioServer.sockets.emit('productos', arrayProductos)
    })
    socket.on('newMessage', async (newMessage) => {
        ioServer.sockets.emit('mensajes',await salvarMensaje(newMessage))

    })
})


const getMensajes = async () => {
    try {
        arrayMensajes=[]
        const traerMensajes = await promises.readFile('./public/chat.json', 'utf-8');
        const mjs = JSON.parse(traerMensajes)
        mjs.map(mensaje => arrayMensajes.push(mensaje))
        return arrayMensajes

    }
    catch (err) { console.log(err) }
};

const salvarMensaje = async (nuevo) => {
    arrayMensajes.push(nuevo);
    try {
        await promises.writeFile('./public/chat.json', JSON.stringify(arrayMensajes))
        return arrayMensajes
    }
    catch (err) {
        console.log(err)
    }
};

const PORT = 8080;
httpServer.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${httpServer.address().port}`)
});
httpServer.on("error", error => console.error(error, "error de conexión"))


