import fs from 'fs'
import {Router} from 'express'
import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'
import path from 'path'
import { agregarProducto, eliminarProducto, modificarProducto, verProductos } from '../resolver/gql_resolver.js'


const schemaContenido = fs.readFileSync(path.resolve('productos','graphql','schemas','productos.gql')).toString();
const schema = buildSchema(schemaContenido);

const gqlMid = graphqlHTTP({
    schema,
    rootValue: {
      verProductos,
      agregarProducto,
      modificarProducto,
      eliminarProducto
    },
    graphiql: true,
  });

export const gqlRouter=Router()

gqlRouter.use('/graphql',gqlMid)