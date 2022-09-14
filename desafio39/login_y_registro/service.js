import configMongo from "./configMongo.js";
import { MongoUser } from "./persistence.js";

const {conexion, usuarios} = configMongo

const mongoUsers= new MongoUser (conexion, usuarios)

const buscarUsuario= async (userName)=>{
    try {
     const usuario = await mongoUsers.findUser(userName)
     return usuario  
    } catch (error) {
        console.log(error)
    } 
}

const guardarUsuario =async(user)=>{
    try {
        const saveNew = usuarios(user);
        await mongoUsers.addUser(saveNew)
    } catch (error) {
        console.log(error)
    }
}


export default {buscarUsuario, guardarUsuario}