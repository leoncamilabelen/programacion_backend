////CONSIGNA 3
const express = requiere ("express");
const express = require ('exoress');
const { fork } = requiere('child_process');

const app= express();
let contador = 0;

randomsRouter.use(express.json());
randomsRouter.use(express.urlencoded({extended:true}));

randomsRouter.get("/:quantity?", (req, res) => {
    const quantity = req.query.quantity || "100000000";
});

app.get('/for-no-bloqueante', (req, res) => {
    const forkeando = fork("./calculoFork.js");
    forkeando.send('empezar');
    forkeando.on('message', (msj) => {
        if (msj === 'termine') res.send('Calculo terminado')
    });
});
