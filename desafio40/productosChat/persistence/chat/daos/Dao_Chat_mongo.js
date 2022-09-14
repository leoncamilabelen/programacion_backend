import chatDataConfig from "../../../config_Product_chat/chatDataConfig.js";
import { MongoClient } from "../../mongo_cliente.js";
import { Mensajes } from "../mensajes.js";

const { chatSchema, conexionChat } = chatDataConfig

let instanceChat
export class ChatDaoMongo {
    constructor() {
        this.ChatCliente = new MongoClient(conexionChat, chatSchema)
    }
    
    static getInstance() {
        if (!instanceChat) instanceChat = new ChatDaoMongo()
        return instanceChat
    }

    async DaoVerMensajes() {
        try {
            const dto = await this.ChatCliente.getAll()
            
            return dto
        }
        catch (error) {
            console.log(error)
        }
    }

    async DaoGuardarMensajes(dtoSchema) {
        try {
            const dto= this.ChatCliente.model(dtoSchema)
            await this.ChatCliente.addData(dto)
        }
        catch (error) {
            console.log(error)
        }
    }

}