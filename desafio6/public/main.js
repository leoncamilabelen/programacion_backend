const socket = io();

const cargarProducto = () => {
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const newProduct = { title: title, price: price, thumbnail: thumbnail }
    socket.emit('newProduct', newProduct)
    document.getElementById('title').value="";
    document.getElementById('price').value="";
    document.getElementById('thumbnail').value="";
    return false
}

const rowTable = (arrayProductos) => {
    const productos = arrayProductos.map(response => `<tr>
    <td>${response.title}</td>
    <td>${response.price}</td>
    <td><img src=${response.thumbnail} alt=${response.title}/></td>
    </tr>
    `).join(" ");
    document.getElementById("lista").innerHTML = productos;
}


const sendMessage = () => {
    const eMail = document.getElementById('eMail').value;
    const time= new Date()
    const text = document.getElementById('messageText').value;
    const date = `${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    const newMessage = { eMail: eMail, text: text, date: date }
    socket.emit('newMessage', newMessage);
    document.getElementById('messageText').value='';
    return false
}


const createMessage = (newMessage) => {
    const { eMail, text, date } = newMessage;
    return `
   <div class="messagesStyle">
   <p class="emailStyle">${eMail}</p> 
    <p class="dateStyle">${date}</>
    <p class="textStyle">${text}</p>
   </div>
`;
}

const addMessages = (arrayMensajes) => {
    const messagesHtml = arrayMensajes.map(mensaje => createMessage(mensaje)).join(" ");
    const mensajeEnviado=document.getElementById("chat")
    mensajeEnviado.innerHTML = messagesHtml;
    mensajeEnviado.scrollTop = mensajeEnviado.scrollHeight;
  }
  socket.on('mensajes', (arrayMensajes) => addMessages(arrayMensajes));



socket.on('productos', (arrayProductos) =>rowTable(arrayProductos)
);



