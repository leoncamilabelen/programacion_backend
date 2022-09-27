import { ChatDaoMongo } from "../chat/daos/Dao_Chat_mongo.js";
import { Mensajes } from "./mensajes.js";


export class ChatRepository {
  constructor() {
    this.dao = ChatDaoMongo.getInstance()
  }

  async verMensajes() {
    try {
      const dto = await this.dao.DaoVerMensajes()
      const mensajes = Mensajes.mensajeDesdeDto(dto)
      return mensajes
    }
    catch (error) {
      console.log(error)
    }
  }
  async guardarMensajes(newMensaje) {
    try {
      const newDto = new Mensajes(newMensaje.author, newMensaje.texto);
      const dtoSchema = newDto.mensajeADto()

      await this.dao.DaoGuardarMensajes(dtoSchema)
    }
    catch (error) {
      console.log(error)
    }
  }
}