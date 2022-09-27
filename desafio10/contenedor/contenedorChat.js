import fs from 'fs';
import normal from 'normalizr';
import { schemaMensajes } from '../logica/normalizar.js';

class ChatContainer {
    constructor(connected) {
        this.connection = connected
    }
    async getAll() {
        try {
            let mensajes = { id: "mensajes", mensaje: JSON.parse(await fs.promises.readFile(this.connection, 'utf-8')) }
            let norm = normal.normalize(mensajes, schemaMensajes)
            return (norm)
        }
        catch (error) {
            console.log(error)
        }
    }
    async addData(newMensaje) {
        try {
            let guardarMensajes = JSON.parse(await fs.promises.readFile(this.connection, 'utf-8'))
            guardarMensajes = [...guardarMensajes, newMensaje]
            await fs.promises.writeFile('./public/guardarChat.json', JSON.stringify(guardarMensajes))
        } catch (error) {
            console.log(error)
        }
    }
}
export const mensajesData = new ChatContainer('./public/guardarChat.json')
