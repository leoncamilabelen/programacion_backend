import mongoose from "mongoose"

export class ChatContainer {
    constructor(connection, model) {
        this.connection = connection
        this.model = model
    }
    mongoConnected() {
        mongoose.connect(this.connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    async getAll() {
        try {
            this.mongoConnected()
            const mensajes = await this.model.find({}, { _id: 0, __v: 0 })
            return (mensajes)
        } catch (error) {
            console.log(error)
        }

    }
    async addData(newMensaje) {
        try {
            this.mongoConnected()
            await newMensaje.save()
        }
        catch (err) {
            console.log(err)
        }
    }
}