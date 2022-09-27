



const getLogin=(req,res)=>{
    res.render('log.hbs',{in:true,titulo:"login"})
    
};  
const postLogin=(req,res)=>{
    res.redirect('/productos')
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


export default {getErrorLogin,getLogin,getLogout,postLogin}