if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}
            
            var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } =   (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);

const mail = require('./mail-model');
const bing_key = process.env.bing_key;
const profile = require('./profile-model');     
exports.filterVolunteers = function(users_data, vol_type, vol_skills, day, time, user, distance_range, purpose, date){
    console.log('filtering volunteers');
    var volunteers = [];
    var intermediate_volunteers = [];
console.log('Volunteers...');
    users_data.forEach(el=>{
    console.log(el);
});
    users_data.forEach(element=>{
        //check if users are volunteers and from same state as the user
        console.log('checking user type...');    
        if(element.userType == 4 || element.userType == 3 || element.userType == 2 && element.state == user.state){
        //check for volunteer type
console.log('checking volunteer type...');
        for(var i = 0; i < element.volunteers_types.length; i++){        
            if(element.volunteers_types[i] == vol_type){
        //compare skills
        console.log('checking skills...');
        for(var j = 0; j < element.volunteers_skills.length; j++){
        if(vol_skills.includes(element.volunteers_skills[j])){
            //check availability
            console.log('checking availability...');
            for(var k = 0; k< element.volunteers_availability.length; k++){
                if(element.volunteers_availability[k].day == day && time >= element.volunteers_availability[k].time_from && time <= element.volunteers_availability[k].time_to){
        intermediate_volunteers.push(element);    
    break;
    }
        }//end of check availability
        break;
    }
    }//end of check skills
     break;
}
        }//end of check type
            }
        } );
        console.log('Intermediate Volunteers length: ' + intermediate_volunteers.length);
        if(intermediate_volunteers.length == 0){
            mail.sendEmail(user.login_mail, 'No Volunteers Found', 'no_volunteers_found');
        }else{
        
        //calculate latitude for user
 var user_coordinates, vol_coordinates, counter = 0;
getUserCoordinates(user.post_code).then((data)=>{         
    user_coordinates = data.resourceSets[0].resources[0].point.coordinates;
//calculate latitude for each volunteer
for(var i = 0; i< intermediate_volunteers.length; i++){
    getCoordinates(volunteers, distance_range, intermediate_volunteers[i], intermediate_volunteers[i].post_code, user_coordinates).then((final_volunteers)=>{        
        console.log('Length: ' + final_volunteers.length);
        counter++;
    console.log(counter);
        if(counter == intermediate_volunteers.length){
        if(final_volunteers.length == 0 ){
            mail.sendEmail(user.login_mail, 'No Volunteers Found', 'no_volunteers_found');
        }else{
            sendMail(final_volunteers, vol_type, vol_skills, purpose, date, time, user);
        }
        
    }
    }).catch((error)=>{
console.log('volunteer latitude error');
    });
}//end of for
}).catch((error)=>{
    console.log('user latitude error');
});    
        }
}//end of filterVolunteers

//function to send email
function sendMail(final_volunteers, vol_type, vol_skills, purpose, date, time, user){
    var type;
    if(vol_type ==1){
        type = 'Reader/Writer';
      }else if(vol_type == 2){
        type = 'Sign Language Interpretor';
      }else{
      type = 'Tutor';
      }
          
    final_volunteers.forEach(el=>{
            mail.sendEmail(el.login_mail, 'Seeking Volunteers', 'all_volunteers', {type: type, purpose: purpose, date: date, time: time, skills: vol_skills, volunteer_id: el.userId, user_id: user.userId});    
        });
}//end of sendMail

//function to get user coordinates
async function getUserCoordinates(post_code){
    console.log('getting user coordinates');
    
    var result = await $.ajax({
        url: "http://dev.virtualearth.net/REST/v1/Locations?countryRegion=India&postalCode=" + post_code + "&key=" + bing_key,
        type: "GET",
        data: ""
    });
    console.log('User coordinates: ' + result.resourceSets[0].resources[0].point.coordinates);
    return result;
}

//function to get volunteer coordinates
async function getCoordinates(volunteers, distance_range, volunteer, post_code, user_coordinates){
    console.log('geting volunteer coordinates');
    var result = await $.ajax({
        url: "http://dev.virtualearth.net/REST/v1/Locations?countryRegion=India&postalCode=" + post_code + "&key=" + bing_key,
        type: "GET",
        data: ""
    });
    
    var vol_coordinates = result.resourceSets[0].resources[0].point.coordinates;
    console.log('Volunteer coordinates: ' + vol_coordinates);
 var distance = await findDistance(user_coordinates, vol_coordinates);   
if(distance <= distance_range){
    volunteers.push(volunteer);
}
return volunteers;
}//end of getCoordinates

//function to find distance 
async function findDistance(user_coordinates, vol_coordinates){
    console.log('finding distance...');
     var response = await $.ajax({
url: "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=" + user_coordinates[0] + "," + user_coordinates[1] + "&destinations=" + vol_coordinates[0] + "," + vol_coordinates[1] + "&travelMode=driving&key=" + bing_key,
type: "GET",
data: "",
    });

var distance= response.resourceSets[0].resources[0].results[0].travelDistance;
console.log('Distance: ' + distance);
return distance;
}//end of findDistance
