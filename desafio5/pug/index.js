const app = require ('./../rutas');

app.set('views', './views_pug');
app.set('view engine', 'pug');

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.error(error, "error de conexión"));