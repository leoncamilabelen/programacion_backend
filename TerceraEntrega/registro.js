const express = require('express');
const session = require('express-session');
const cp = require('cookie-parser');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());

app.use(cp()); //cookie parser

app.use(session({
    secret: 'camila',
    saveUninitialized: false,
    resave: true
  }));

const users = [];

//Registracion
passport.use('registracion', new LocalStrategy((email, password, callback) => { 
    const user = users.find(usuario => usuario.email === email); 
    const passwordHasheado = bcrypt.hashSync(password, bcrypt.genSaltSync(10)); 
    const usuarioCreado = { email, password: passwordHasheado }; 
    users.push(usuarioCreado); 
    callback(null, emailCreado);
}));

const usuarios = [{ email: 'camila.leon@gmail.com', password: 'leon' }]; //email y password

const requiereAutenticacion = (req, res, next) => { 
    if (req.session.email) return next(); 
    res.status(401).send('No estas autenticado');
  }

app.post('/login', rechazaAutenticado, (req, res) => { 
    const { email, password } = req.body;
    const user = usuarios.find(usr => usr.email === email);
    if (!user || user.password !== password) return res.status(401).send('email o password incorrectos'); 
    req.session.email = email; 
    res.send('Bienvenido'); 
});

app.get('/datos', requiereAutenticacion, (req, res) => { 
    res.send(req.session);
  });