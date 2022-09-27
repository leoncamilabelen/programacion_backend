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

export default {getRegistro,postRegistro,getErrorRegistro,getLogin,postLogin,getErrorLogin,getLogout,getProductos}