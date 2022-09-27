import {fork} from "child_process"
import { cpus } from "os";
import parseArgs from "minimist"
const puerto= parseArgs(process.argv.slice(2), { alias: { 'p': 'port' }, default: { 'port': 8080} }).port

const getRegistro =(req,res)=>{
    res.render('registro.hbs',{titulo:'registro'})
};
    
const postRegistro =(req,res)=>{
    res.redirect('/login')
};  
const getErrorRegistro=(req,res)=>{
res.render('error',{registro:'registro'})    
};  
const getLogin=(req,res)=>{
    res.render('log.hbs',{in:true,titulo:"login"})
    
};  
const postLogin=(req,res)=>{
    res.redirect('/')
};  
const getErrorLogin=(req,res)=>{
    res.render('error')
};

const getLogout=(req,res)=>{
    const nombre=req.session.passport.user
   req.session.destroy(err=>{
    console.log((err)?err:'log out')
   })
    res.render("log.hbs",{nombre:nombre,in:false,titulo:"log out"})
};

const getProductos =(req,res)=>{
    if (req.session.passport){
        const nombre=req.session.passport.user
        res.render("index.hbs",{nombre,titulo:"productos"})}
        else
        res.redirect('/login')
};

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

const randomFork=(req,res)=>{
    const num =Number(req.query.cant) || 1e8
    const forked= fork('fork.js')
    forked.send(num)
    forked.on('message',(verNumeros)=>{
        res.send({'port':puerto,num:verNumeros})
})    
}

export default {getRegistro,postRegistro,getErrorRegistro,getLogin,postLogin,getErrorLogin,getLogout,getProductos, getInfo, randomFork}