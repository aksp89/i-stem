if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}
var hbs = require('nodemailer-express-handlebars');
var nodemailer=require('nodemailer');
	var transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 250,
  auth: {
    user: process.env.email,
    pass: process.env.password
  },
  tls: {
    rejectUnauthorized: false
  }
});
//use hbs to render email
transporter.use('compile', hbs({
viewPath:appRoot + '/public/email/',
extName: '.hbs',
viewEngine: {
    extName: '.hbs',
    partialsDir:appRoot + '/public/email',
  }
}));
const from = 'I-stem';

exports.sendEmail = function(to, subject, template, context = '', attachments = []){
  mailOptions = {
    from: from,
    to: to,
    subject: subject,
    template: template,
    context: context,
      attachments: attachments
  };
    transporter.sendMail(mailOptions, function(err, info){
    if(err){
      console.log(err)
      console.log('could not send mail');
    }else{
      console.log('email sent');
    }
    });
}//end of function
