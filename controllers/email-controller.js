const cosmos = require('../models/cosmos');
const mail = require('../models/mail-model');

exports.sendVolunteerDetails = function(req, res){
    var volunteer_id = req.params.volunteer_id;
    var user_id = req.params.user_id;    
    console.log('UserId: ' + user_id);
    console.log('VolunteerId: ' + volunteer_id);

    //get volunteer and user information
    var volunteer, user;    
    cosmos.getData(volunteer_id).then((data)=>{
        volunteer = data;
cosmos.getData(user_id).then((data)=>{
    user = data;
      
mail.sendEmail(user.login_mail, 'Volunteer Found', 'volunteer_found', {firstName: volunteer.firstName, lastName: volunteer.lastName, email: volunteer.login_mail, skills: volunteer.volunteers_skills, volunteer_id: volunteer.userId, user_id: user.userId});
}).catch((e)=>{
    console.log('could not fetch user info');
});    
}).catch((e)=>{
console.log('could not fetch volunteer info');
    });
    
   res.send('Thank you so much');
}

exports.sendUserDetails = function(req, res){
    var volunteer_id = req.params.volunteer_id;
var user_id = req.params.user_id;
console.log('User received id: ' + user_id);
console.log('Volunteer id received: ' + volunteer_id);
//get user and volunteer details
var volunteer, user;    
    cosmos.getData(volunteer_id).then((data)=>{
volunteer = data;
cosmos.getData(user_id).then((data)=>{
    user = data;
    mail.sendEmail(volunteer.login_mail, 'Volunteer finalised', 'volunteer_finalised', {firstName: user.firstName, lastName: user.lastName, email: user.login_mail});
}).catch((e)=>{
    console.log('could not fetch user info');
});    
}).catch((e)=>{
console.log('could not fetch volunteer info');
    });
    
res.send("Your response has been sent to the respective volunteer");
}
