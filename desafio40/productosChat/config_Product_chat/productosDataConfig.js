import { config } from 'dotenv';
import mongoose from "mongoose";

config()
const productosS = new mongoose.Schema(
    {
        id: {type:String} ,
        title: {type:String},
        price: {type:Number},
        thumbnail: {type:String}
    }
)

const productosSchema = mongoose.model('productos', productosS);

const conexionProductos = process.env.DATA

export default { productosSchema, conexionProductos }