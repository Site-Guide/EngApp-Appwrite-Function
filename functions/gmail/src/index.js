const nodemailer = require('nodemailer');

module.exports = async function (req, res) {


  const senderEmail = req.variables.SENDER_EMAIL;
  const senderPassword = req.variables.SENDER_PASSWORD;
  
  console.log(req.payload);
  const payload = JSON.parse(req.payload);
  
  const receiverEmails = payload.emails;
  const subject = payload.subject;
  const message = payload.message;
 

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
  });

  receiverEmails.forEach((receiver) => {
    transporter.sendMail({
      from: senderEmail,
      to: receiver,
      subject: subject,
      text: message,
    }, (error, info) => {
      if (error) {
        console.error(error);
        res.json({
          error: error,
      });
      } else {
        console.log(`Email sent to ${receiver}: `, info.response);
        res.json({
          areDevelopersAwesome: true,
        });
      }
    });
  });


};
