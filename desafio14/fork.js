import {numerosAleatorios} from "./logica/numerosAleatorios.js"


process.on('message',(num)=>{
    const verNumeros=numerosAleatorios(num)
   process.send(verNumeros)
})

