// ////CONSIGNA 1

// require("dotenv").config();
// const { application } = require("express");
// const minimist = require('minimist');

// const resultado = minimist(process.argv, { alias: { 'p': 'port'}, default: { 'p': 8080}});





// console.log(resultado.port);



////CONSIGNA 2
app.get("/info", ( rqe, res ) => {
    const info= {
        args: args,
        sistema: process.plataform,
        nodeVersion: process.version,
        memory: process.memoryUsage.rss(),
        path: process.cwd(),
        processId: process.pid,
        file: __dirname
    }
})
    process.on('exist', (codigo) => {
        console.log('Saliendo con codigo: ', codigo);
});

console.log(info);





