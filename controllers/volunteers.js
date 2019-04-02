const volunteers_model = require('../models/volunteers-model');
const profile=require('../models/profile-model');
//function to display volunteers form        
exports.getVolunteers = function(req, res){
    res.render('volunteers.hbs');
}

//function to find volunteers
exports.findVolunteers = function(req, res){
    //get form data    
    var vol_type = req.body.vol_type;
    var vol_skills = req.body.vol_skills;
    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var date = req.body.date;
    var d = new Date(date);
    var day = days[d.getDay()];
    var hours = req.body.hours;
    var minutes = req.body.minutes;
    var time = hours +'.' + minutes;
    var purpose = req.body.purpose;
    var distance_range = req.body.distance_range;
    //call get all users info api
  /*
    var user = {userId:1, login_mail: 'aksp89@gmail.com', post_code: 403601, state: 'goa'};
   var users_data=[
       {userId: 2, userType: 2, login_mail: 'kas005@chowgules.ac.in', volunteers_types: [1,3], volunteers_skills: ['math'], volunteers_availability: [{day: 'saturday', time_from: 9, time_to: 12}], post_code: 403602, state: 'goa'}
   ];
*/
   
var user;
    var users_data = [];
   
    profile.getUserInfo(token).then((result)=>{
		console.log('user info retrieved');
	user=result.data;
    console.log('User Info: ' + user);
	profile.getAllUserInfo(token).then((result)=>{
        console.log('all user info retrieved');
        users_data=result.data;
        console.log('All users info: ' + users_data);
        volunteers_model.filterVolunteers(users_data, vol_type, vol_skills, day, time, user, distance_range, purpose, date);
        
    }).catch((err)=>{
        console.log('could not get all user info');
	});
   }).catch((err)=>{
    console.log('could not get user info');
    });
     
    res.render('volunteers.hbs', {message: 'Your request has been submitted. You will receive an email if we find any volunteers matching your request. Thank you!'});
}//end of findVolunteers

