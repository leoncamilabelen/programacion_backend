//ENVIAR EMAIL CON GMAIL

const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'camila.iurd12@gmail.com',
        pass: 'nicblfygwwscjfje'
    }
});

const asunto = process.argv[2];
const contenido = process.argv[3];

transport.sendMail({
    from: 'Camila <camila.iurd12@gmail.com>',
    to: 'camila.iurd12@gmail.com',
    html: contenido,
    subject: asunto,
}).then((result) => {
    console.log(result);
}).catch(console.log);