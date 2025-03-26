# Node mailer
```javascript
import nodemailer from 'nodemailer'
import env from '../../envConfig.js'



export default async function postContact (req, res) {
  const { email, subject, message } = req.body;
  console.log(email);
  //este console.log de arriba me da que la info es correcta: email es el remitente, 
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    service: 'gmail',
    auth: {
        user: env.GmailUser,
        pass: env.GmailPass,
    },
    tls: {
      rejectUnauthorized: false
  }
});

// Configuración del correo electrónico
let mailOptions = {
    from: email,
    to: env.GmailUser,
    subject: subject,
    text: message,
    replyTo: email
};
  try {
      console.log({mailOptions})
      await transporter.sendMail(mailOptions);
      res.status(200).json({'message': 'Mensaje enviado exitosamente'})
  } catch (error) {
      console.error('Error al enviar el correo:', error);
      res.status(400).json({error: error.message})
  }
};

```