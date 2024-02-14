const nodemailer = require("nodemailer");

const SendMail = async function(to, subject, body){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "swasankar002@gmail.com", // generated ethereal user
          pass: "kcuvyyvmmiefvddd", // generated ethereal password
        },
      });
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"HireAWear" <swasankar002@gmail.com>',
        to: to,
        subject: subject,
        html: body
      });
    
      console.log("Message sent: %s", info.messageId);
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = { SendMail }