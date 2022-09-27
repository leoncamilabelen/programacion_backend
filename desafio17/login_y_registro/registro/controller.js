

const getRegistro =(req,res)=>{
    res.render('registro.hbs',{titulo:'registro'})
};
    
const postRegistro =(req,res)=>{
    res.redirect('/login')
};  
const getErrorRegistro=(req,res)=>{
res.render('error',{registro:'registro'})    
};  
  

export default {getErrorRegistro,getRegistro,postRegistro}