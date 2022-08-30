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
const destinatario = process.argv[4];
const archivo = process.argv[5];

let opciones = {
  from: 'Camila <camila.iurd12@gmail.com>',
  to: destinatario,
  html: contenido,
  subject: asunto,
}

if (archivo) opciones['attachments'] = [{ path: archivo }]; 

transport.sendMail(opciones).then((result) => {
    console.log(result);
}).catch(console.log);