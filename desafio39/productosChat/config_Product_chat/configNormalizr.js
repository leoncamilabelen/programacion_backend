import norm from "normalizr";

const authorS= new norm.schema.Entity('author')

const schemaMsjs= new norm.schema.Entity('msjs',{
    author:authorS
},{idAttribute:'texto'})

const schemaMensajes=new norm.schema.Entity('mensajes',{
mensaje:[schemaMsjs]
})
export default{schemaMensajes}