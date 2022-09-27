import { ChatContainer } from '../persistence/chatPersistence.js';
import chatDataConfig from "../config_Product_chat/chatDataConfig.js";
import configNormalizr from '../config_Product_chat/configNormalizr.js';
import normal from 'normalizr'

const mensajeSchema = configNormalizr.schemaMensajes
const { chatSchema, conexionChat } = chatDataConfig

const mensajesData = new ChatContainer(conexionChat, chatSchema)


const mostrarMensajes = async () => {
    try {
        const mensaje = [];
        const msjs = await mensajesData.getAll()
        msjs.map((e) => mensaje.push({ author: e.author, texto: e.texto }))
        const mensajes = { id: 'mensajes', mensaje: mensaje }
        let norm = normal.normalize(mensajes, mensajeSchema)
        return (norm)
    }
    catch (error) {
        console.log(error)
    }
}

const guardarMensaje = async (newMensaje) => {
    try {
        const saveNew = chatSchema(newMensaje);
        await mensajesData.addData(saveNew)
    }
    catch (error) {
        console.log(error)
    }
}
export default { mostrarMensajes, guardarMensaje }