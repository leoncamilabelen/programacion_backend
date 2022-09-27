import { config } from 'dotenv';
import mongoose from "mongoose";

config()
const chatS = new mongoose.Schema(
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

const chatSchema = mongoose.model('chats', chatS);

const conexionChat = process.env.DATA

export default{ chatSchema, conexionChat}