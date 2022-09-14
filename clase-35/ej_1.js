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

const asunto = process.argv[2];
const contenido = process.argv[3];

transport.sendMail({
    from: 'Camila <camila.iurd12@gmail',
    to: 'alice.macejkovic1@ethereal.email',
    html: contenido,
    subject: asunto,
}).then((result) => {
    console.log(result);
}).catch(console.log);