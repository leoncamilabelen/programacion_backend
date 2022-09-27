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



class MongoUser{
    constructor(){
            this.connection= conexion
            this.model= usuarios
    }
    mongoConnected() {
    mongoose.connect(this.connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
    async addUser(user) {
        try {
            this.mongoConnected()
            const saveNew = this.model(user);
            await saveNew.save()
        }
        catch (err) {
            console.log(err)
        }
    }
    async findUser(username) {
        try {
            this.mongoConnected()
            const filterUser = this.model.find({username:username})
            return filterUser
        } catch (error) {
            console.log(error)
        }
    }
}
export const mongoUsers= new MongoUser ()