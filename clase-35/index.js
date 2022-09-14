//COMO ENVIAR EMAIL CON ETHEREAL

const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'alice.macejkovic1@ethereal.email',
        pass: 'KbgGhSF2gTHr3WExg3'
    }
});

transport.sendMail({
    from: 'Camila <camila.iurd12@gmail',
    to: 'alice.macejkovic1@ethereal.email',
    subject: 'Mail de prueba desde Node.js',
    html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
}).then((result) => {
    console.log(result);
}).catch(console.log);