var nodemailer=require('nodemailer');
if (process.env.NODE_ENV !== 'production') {
require('dotenv').load();
}

function admin_mail(email,subject,htmldata,attachment){
	var transporter = nodemailer.createTransport({
  service: 'gmail',
	port: 250,
  auth: {
		user: process.env.email,
    pass: process.env.password
  }
});

var mailOptions = {
  from: process.env.email,
  to: email,
  subject: subject,
  text:'',
  html:htmldata,
  attachments:attachment

};


transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}//end of function



module.exports=
{
	admin_mail
};
