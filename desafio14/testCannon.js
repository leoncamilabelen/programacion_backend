import autocannon from "autocannon";
import {PassThrough} from "stream";

const run= (url)=>{
    const buf =[]
    const salidaStream= new PassThrough()

    const inst = autocannon({
        url,
        connection: 100,
        duration: 20
    })  
    autocannon.track(inst,{salidaStream})
    salidaStream.on('data',data=>buf.push(data))
    inst.on('done', ()=>{process.stdout.write(Buffer.concat(buf))})
}

run('http://localhost:8080/info')
//run('http://localhost:8080/info_conLog')