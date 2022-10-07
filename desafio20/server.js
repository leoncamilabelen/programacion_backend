import koa from 'koa'
import koaBody from 'koa-body'
import { routerProductos } from './productos/routes/rutas_productos.js'
import renderer from 'koa-hbs-renderer'
import Handlebars from 'handlebars'
import serve from 'koa-static'
const app = new koa()

app.use(koaBody())

app.use(serve('public'))

const options = {
    extension: '.hbs',
    hbs: Handlebars.create(),
    paths: {
        views:'public/views_hbs/'
    },
    Promise: Promise
};


app.use(renderer(options))


app.use(routerProductos.routes())

app.listen(8080, console.log('conectado')) 