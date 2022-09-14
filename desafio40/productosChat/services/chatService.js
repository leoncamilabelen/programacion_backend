import configNormalizr from '../config_Product_chat/configNormalizr.js';
import normal from 'normalizr'
import chatDataConfig from "../config_Product_chat/chatDataConfig.js";
import { ChatRepository } from "../persistence/chat/chat_repository.js";


const mensajeSchema = configNormalizr.schemaMensajes


const mensajesData = new ChatRepository()


const mostrarMensajes = async () => {
    try {        
        const mensaje = await mensajesData.verMensajes()
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
        await mensajesData.guardarMensajes(newMensaje)
    }
    catch (error) {
        console.log(error)
    }
}
export default { mostrarMensajes, guardarMensaje }