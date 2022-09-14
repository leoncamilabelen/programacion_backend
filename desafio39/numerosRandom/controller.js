import {fork} from "child_process"
import parseArgs from "minimist"
const puerto= parseArgs(process.argv.slice(2), { alias: { 'p': 'port' }, default: { 'port': 8080} }).port


const generarNumeros=(req,res)=>{
    const num =Number(req.query.cant) || 1e8
    const forked= fork('numerosRandom/service.js')
    forked.send(num)
    forked.on('message',(verNumeros)=>{
        res.send({'port':puerto,num:verNumeros})
})    
}

export default {generarNumeros}