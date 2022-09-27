import { config } from 'dotenv';
import mongoose from "mongoose";
import normal from 'normalizr';
import { schemaMensajes } from '../logica/normalizar.js';

config()
const chatSchema = new mongoose.Schema(
    {
        author:{
            id: { type: String },
            nombre: { type: String },
            apellido: { type: String },
            edad: { type: Number },
            alias: { type: String },
            avatar: { type: String },
            timestamp: { type: String }
        },
        texto: { type: String }
    }
)

const chatS = mongoose.model('chats', chatSchema);

const conexionChat = process.env.DATA

class ChatContainer {
    constructor() {
        this.connection = conexionChat
        this.model = chatS
    }
    mongoConnected() {
        mongoose.connect(this.connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    async getAll() {
        try {
            const mensaje=[];
            this.mongoConnected()
            const msjs=await this.model.find({},{_id:0,__v:0})
            msjs.map((e)=>mensaje.push({author:e.author,texto:e.texto}))
            const mensajes = { id: 'mensajes', mensaje:mensaje  }
            let norm = normal.normalize(mensajes, schemaMensajes)
            return (norm)
        } catch (error) {
            console.log(error)
        }

    }


    async addData(newMensaje) {
        try {
            this.mongoConnected()
            const saveNew = this.model(newMensaje);
            await saveNew.save()
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const mensajesData = new ChatContainer()
