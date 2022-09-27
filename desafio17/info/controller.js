import { cpus } from "os";



const getInfo=(req,res)=>{
    const {argv,platform,version,memoryUsage,cwd,pid,title}=process
    const informacion= {
        Argumentos:argv,
        plataforma:platform,
        Version_Node: version,
        memoria:memoryUsage(),
        path_de_ejecución:cwd(),
        id_del_proceso:pid,
        carpeta_del_proyecto:title,
        CPUS:cpus().length
    }
    res.send(informacion)
}
export default {getInfo}