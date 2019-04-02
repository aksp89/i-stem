


function userdata(update_data){

var profile='<div id="main"><div class="mainDetails">'
var heading='<div id="detail">'
heading+='<div id="name"><h1>'+update_data.firstName+' '+update_data.lastName+'</h1><h1>'+update_data.email+'</h1></div>'
profile+=heading
profile+='</div><div class="clear"></div></div>'
profile+='<div id="mainArea">'
profile+='<section><article><div class="sectionTitle"><h1>personal info</h1></div>'
profile+='<div class="sectionContent">'

var table_body = '<table border="0" id="user_table"><tbody><col width="200"><col width="300">';

table_body+='<tr>';
 table_body +='<td>';table_body += 'email' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.email ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body += 'usertype' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.userType ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body += 'First name' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.firstName ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body += 'Last Name' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.lastName ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body += 'mobile' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.mobile ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body += 'gender' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.gender ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body += 'community' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.comunities ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body += 'post code' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.post_code ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body += 'state' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.State ;table_body +='</td>';
table_body+='</tr>';

table_body+='</tbody></table>'
profile+=table_body
profile+='</div></article><div class="clear"></div></section>'

profile+='<section><article><div class="sectionTitle"><h1>Initiative</h1></div>'
profile+='<div class="sectionContent">'
var table_body = '<table border="0" id="user_table"><tbody><col width="200"><col width="250">';

table_body+='<tr>';
 table_body +='<td>';table_body += 'User Training' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.initiatives.trainings ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body += 'User Events' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.initiatives.events ;table_body +='</td>';
table_body+='</tr>';

table_body+='</tbody></table>'
profile+=table_body
profile+='</div></article><div class="clear"></div></section>'

profile+='<section><article><div class="sectionTitle"><h1>Profile</h1></div>'
profile+='<div class="sectionContent">'
var table_body = '<table border="0" id="user_table"><tbody><col width="200"><col width="220">';

table_body+='<tr>';
 table_body +='<td>';table_body += 'Facebook id' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.profile.facebook;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body += 'Twitter id' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.profile.twitter ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body += 'LinkedIn id' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.profile.linkedin;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body += 'Website' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.profile.website ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body +='Industry' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.profile.industry ;table_body +='</td>';
table_body+='</tr>';

table_body+='</tbody></table>'
profile+=table_body
profile+='</div></article><div class="clear"></div></section>'

profile+='<section><article><div class="sectionTitle"><h1>Education</h1></div>'
profile+='<div class="sectionContent">'
var table_body = '<table border="0" id="user_table"><tbody><col width="200"><col width="220">';


table_body+='<tr>';
 table_body +='<td>';table_body += 'University Name' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.profile.education[0].university_name;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body += 'Major' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.profile.education[0].major ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body += 'Class' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.profile.education[0].class;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body += 'Years of completion' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.profile.education[0].year_of_completion ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body += 'Relevant Course' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.profile.education[0].relevent_courses;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body += 'Educational Achievement' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.profile.education[0].achievements ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body += 'Extracurricular Activity' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.profile.education[0].extra_curriculars;table_body +='</td>';
table_body+='</tr>';

table_body+='</tbody></table>'
profile+=table_body
profile+='</div></article><div class="clear"></div></section>'

profile+='<section><article><div class="sectionTitle"><h1>Work Experience</h1></div>'
profile+='<div class="sectionContent">'
var table_body = '<table border="0" id="user_table"><tbody><col width="200"><col width="220">';

table_body+='<tr>';
 table_body +='<td>';table_body += 'Company Name' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.profile.work_experience[0].company;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body +='Company Location' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.profile.education[0].location ;table_body +='</td>';
table_body+='</tr>';

var startdate=new Date(update_data.profile.work_experience[0].start_date)
var yy=startdate.getFullYear();
var mm=startdate.getMonth();
var dd=startdate.getDate();
if(dd<10)
{
dd='0'+dd;
}
if(mm<10)
{
mm='0'+mm;
}
var newstartdate=yy+"-"+mm+"-"+dd;


table_body+='<tr>';
 table_body +='<td>';table_body +='Start Date' ;table_body +='</td>';
table_body +='<td>'; table_body +=newstartdate ;table_body +='</td>';
table_body+='</tr>';

var enddate=new Date(update_data.profile.work_experience[0].end_date);
var yy=enddate.getFullYear();
var mm=enddate.getMonth();
var dd=enddate.getDate();
if(dd<10)
{
dd='0'+dd;
}
if(mm<10)
{
mm='0'+mm;
}
var newenddate=yy+"-"+mm+"-"+dd;

table_body+='<tr>';
 table_body +='<td>';table_body +='END Date' ;table_body +='</td>';
table_body +='<td>'; table_body +=newenddate ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body +='Position' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.profile.work_experience[0].position ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body +='Summary od Responsibilities' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.profile.work_experience[0].summary_of_responsibilities;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body +='Work Achievement' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.profile.work_experience[0].achievements ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body +='Current Employment State' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.profile.work_experience[0].current_employment_state ;table_body +='</td>';
table_body+='</tr>';

table_body+='</tbody></table>'
profile+=table_body
profile+='</div></article><div class="clear"></div></section>'

if(update_data.userType==1){


  profile+='<section><article><div class="sectionTitle"><h1>Community Connect</h1></div>'
  profile+='<div class="sectionContent">'
  var table_body = '<table border="0" id="user_table"><tbody><col width="200"><col width="220">';

table_body+='<tr>';
table_body +='<td>';table_body +='Skills' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.community_connect.skills ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
table_body +='<td>';table_body +='Skills to learn' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.community_connect.skills_to_learn ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body +='About You' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.community_connect.about_you ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body +='Potential Match' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.community_connect.potential_matches ;table_body +='</td>';
table_body+='</tr>';

table_body+='</tbody></table>'
profile+=table_body
profile+='</div></article><div class="clear"></div></section>'

} else {
  profile+='<section><article><div class="sectionTitle"><h1>Volunteers</h1></div>'
  profile+='<div class="sectionContent">'
  var table_body = '<table border="0" id="user_table"><tbody><col width="200"><col width="220">';

table_body+='<tr>';
 table_body +='<td>';table_body +='Volunteers' ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body +='Volunteers Skills' ;table_body +='</td>';
table_body +='<td>'; table_body +=update_data.volunteer_skills ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body +='Volunteers Roles' ;table_body +='</td>';
var data='';
var types=update_data.volunteers_types;
types.forEach((val)=>{
  if(val==1){
    data+='Reader Writer'
  }else if(val==2){
    data+='Sign Language Interpreter'
  }else{
    data+='Tutor'
  }
});
table_body +='<td>'; table_body +=data ;table_body +='</td>';
table_body+='</tr>';

table_body+='<tr>';
 table_body +='<td>';table_body +='Volunteers Availability' ;table_body +='</td>';
var vol_availability=update_data.volunteers_availability;
vol_availability.forEach((array_val)=>{

var obj={day :array_val.day,
		time_from :array_val.time_from,
		time_to :array_val.time_to
};
    table_body +='<td>'; table_body +=obj ;table_body +='</td>';
});

table_body+='</tr>';

table_body+='</tbody></table>'
profile+=table_body
profile+='</div></article><div class="clear"></div></section>'
}
profile+='</div></div>'
//return profile;
//$('#tabledata').html(profile)
return profile;
}
