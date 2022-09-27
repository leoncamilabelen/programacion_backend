import { engine } from "express-handlebars";


export const hbsEngine = engine({
    extname: ".hbs",
    defaultLayout: 'main.hbs',
})




