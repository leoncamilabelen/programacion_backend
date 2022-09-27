import { Container } from "../logica/contenedor.js"

const sqLiteData = {
    client: 'sqlite3',
    connection:'./DB/eCommerce.sqlite'
  }

export const mensajesData=new Container(sqLiteData,'chat')
//mensajesData.droopTable()
mensajesData.createTableChat()