let socket = io();


fetch('./views_hbs/products.hbs')
.then(response => response.text())
.then(template => {
    const hbsView = Handlebars.compile(template);
    socket.on('productos', (productsList) => {
        let hayProductos=(productsList.length>0)? true:false;
        const htmlView = hbsView({ productsList,hayProductos });
        document.getElementById("vistaProductos").innerHTML = htmlView;
    })
    
})

fetch('./views_hbs/chat.hbs')
.then(response => response.text())
.then(template=>{
    const hbsView = Handlebars.compile(template);
    socket.on('mensajes', (messagesList) => {
        let hayMensajes=(messagesList.length>0)?true:false
        const htmlView = hbsView({messagesList, hayMensajes});
        const chatDiv=document.getElementById("chat")
        chatDiv.innerHTML = htmlView;
        chatDiv.scrollTop = chatDiv.scrollHeight
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
    const eMail = document.getElementById('eMail').value;
    const time= new Date()
    const text = document.getElementById('messageText').value;
    const date = `${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    const newMessage = { eMail: eMail, text: text, date: date  }
    socket.emit('newMessage', newMessage);

    document.getElementById('messageText').value='';
    return false
}