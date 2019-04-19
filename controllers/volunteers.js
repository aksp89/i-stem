const volunteers_model = require('../models/volunteers-model');
const profile=require('../models/profile-model');
//function to display volunteers form        
exports.getVolunteers = function(req, res){
	res.render('volunteers.hbs');
}

//function to find volunteers
exports.findVolunteers = function( req, res){
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
	//validate 
var response = validateData(vol_type, vol_skills, purpose, d, hours, minutes, distance_range);
console.log(response);
if(response.status == false){
	res.render('volunteers', {message: response.message});
}else{
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
	 
	res.render('volunteers', {message: 'Your request has been submitted. You will receive an email if we find any volunteers matching your request. Thank you!'});
}//end of findVolunteers
}

function validateData(vol_type, vol_skills, purpose, date, hours, minutes, distance_range){
	var status, message;
	var currentDate = new Date();
	if(!vol_type || !vol_type.length ){
		status = false;
		message = "Please select volunteer type";
		return {status: status, message: message};
	}
	if(!vol_skills || !vol_skills.length){
		status = false;
		message = " Please select volunteer skills";
		return {status: status, message: message};
	}
	if(!purpose || !purpose.length){
		status = false;
		message = "Please state the purpose for which the volunteer is required";
		return {status: status, message: message};
	}
	if(!hours || hours > 23 || hours < 5){
		status = false;
		message = "Hours must be between 5 and 23";
		return {status: status, message: message};
	}
	if(!minutes || minutes > 59 || minutes < 0){
		status = false;
		message = "Minutes must be between 0 and 59";
		return {status: status, message: message};
	}
	if(!distance_range || distance_range > 150 || distance_range < 1){
		status = false;
		message = "Invalid distance range";
		return {status: status, message: message};
	}
	if(!date || !date.length){
		status = false;
		message = "Please select valid date";
		return {status: status, message: message};
	}
	if(!date || !date.length || date < currentDate){
		status = false;
		message = "Invalid date";
		return {status: status, message: message};
	}
	status = true;
	return {status: status, message: message};
}
