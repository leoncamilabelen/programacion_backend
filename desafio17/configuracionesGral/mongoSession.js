import MongoStore from"connect-mongo";
import session from "express-session";
import { config } from "dotenv";

config()

const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const URL = process.env.DATA

export const sessionConMongo=session({
    store: MongoStore.create({
        
        mongoUrl: URL,
        mongoOptions: advanceOptions
    }),
    secret: process.env.SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
})

