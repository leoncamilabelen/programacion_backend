let socket = io();

const authorS= new normalizr.schema.Entity('author')

const schemaMsjs= new normalizr.schema.Entity('msjs',{
    author:authorS
},{idAttribute:'texto'})

const schemaMensajes=new normalizr.schema.Entity('mensajes',{
    mensaje:[schemaMsjs]
}) 

fetch('./views_hbs/products.hbs')
    .then(response => response.text())
    .then(template => {
        const hbsView = Handlebars.compile(template);
        socket.on('productos', (productsList) => {
            let hayProductos = (productsList.length > 0) ? true : false;
            const htmlView = hbsView({ productsList, hayProductos });
            document.getElementById("vistaProductos").innerHTML = htmlView;
        })

    })

fetch('./views_hbs/chat.hbs')
    .then(response => response.text())
    .then(template => {
        const hbsView = Handlebars.compile(template);
        socket.on('mensajes', (list) => {
            const arrayMsj=normalizr.denormalize(list.result,schemaMensajes,list.entities);
            const messagesList=arrayMsj.mensaje;
            const porcentaje=porcentajeNorm(list,arrayMsj)
            let hayMensajes = (messagesList.length > 0) ? true : false
            const htmlView = hbsView({ messagesList, hayMensajes});
            const chatDiv = document.getElementById("chat")
            chatDiv.innerHTML = htmlView;
            chatDiv.scrollTop = chatDiv.scrollHeight
            document.getElementById('porcentaje').innerHTML=porcentaje
        })
    })
const cargarProducto = () => {
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const newProduct = { title: title, price: price, thumbnail: thumbnail };
    socket.emit('newProduct', newProduct)
    document.getElementById('title').value = "";
    document.getElementById('price').value = "";
    document.getElementById('thumbnail').value = "";
    return false
}

const sendMessage = () => {
    const id = document.getElementById('eMail').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const time = new Date()
    const avatar = document.getElementById('avatar').value;
    const texto = document.getElementById('messageText').value;
    const timestamp =`${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    const newMessage = { 'author': { id, nombre, apellido, edad, avatar, timestamp }, texto }
    socket.emit('newMessage', newMessage);
    document.getElementById('messageText').value = '';
    return false
}

const porcentajeNorm=(dataNorm, dataDenorm)=>{
    const norm=JSON.stringify(dataNorm)
    const deNorm = JSON.stringify(dataDenorm)
    let porcentaje =(norm.length*100)/deNorm.length
    return `${porcentaje.toFixed(2)}%`
}


document.getElementById('cambiarRuta').addEventListener('click',()=>{
    window.location.assign('/logout')
})

