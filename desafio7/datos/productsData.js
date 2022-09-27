import { Container } from "../logica/contenedor.js";

const mysqlData = {
    client: 'mysql2',
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "productos"
    }
};

export const productsData= new Container(mysqlData,'products')
//productsData.droopTable()
productsData.createTable()