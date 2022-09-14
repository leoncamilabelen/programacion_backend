import {config} from "dotenv";
import mongoose from "mongoose";
config()

const userSchema = new mongoose.Schema(
    {
        username: { type: String },
        password: { type: String }
    }
)

const usuarios = mongoose.model('usuario', userSchema);
const conexion=process.env.DATA

export default {usuarios, conexion}