const router = require('express').Router();
const nodemailer = require('nodemailer');
require('dotenv').config();



router.post('/', (req, res, next) => {
  try {
    const { name, email, msg } = req.body;
    const htmlEmail = `
        <h1> Email </h1>
        <ul>
        <li> Name: ${name} </li>
        <li> Email: ${email} </li>
        <h3> Message </h3>
        <p> ${msg} </p>
        </ul>
      `;
  
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
    });
  
    let mailOptions = {
      from: `<support@challenge.com>`,
      to: process.env.EMAIL_USER,
      subject: 'New Message',
      text: msg,
      html: htmlEmail,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return err;
      }
      res.sendStatus(200);
    });
  } catch (error) {
    next(error)
  }
});

module.exports = router;
