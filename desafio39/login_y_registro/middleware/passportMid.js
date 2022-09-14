import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"
import bcrypt, { genSaltSync } from "bcrypt"
import service from "../service.js";


passport.use('registro', new LocalStrategy(async (username, password, callback) => {
    try {
        const userReg = await service.buscarUsuario(username);    
        if (userReg.length > 0) { return callback()};
        const passHash = bcrypt.hashSync(password, genSaltSync(10));
        const newUser = { username, password: passHash }
        await service.guardarUsuario(newUser)
        callback(null, newUser)
    }
    catch (err) {
        console.log(err)
    }
}))

passport.use('auth', new LocalStrategy(async (username, password, callback) => {
    const userLogArray = await service.buscarUsuario(username);
    const userLog = userLogArray[0]
    if (!userLog || !bcrypt.compareSync(password, userLog.password)) return callback();
    callback(null, userLog);
}));


passport.serializeUser((user, callback) => {
    callback(null, user.username)
});

passport.deserializeUser((username, callback) => {
    const user = service.buscarUsuario(username);
    callback(null, user)
});

export default passport