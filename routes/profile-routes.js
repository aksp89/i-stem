 if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}
var nodemailer=require('nodemailer');
const { check, validationResult } = require('express-validator/check')
var { admin_mail } = require("../models/mail");
var { getUser ,isuserloggedin ,isadminloggedin,getallUser, getdata }= require("../models/test-model")
const express = require("express");
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);
var router=express.Router();
var https=require('https');

const az = require('../models/azure-storage-model');
const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage });
const getStream = require('into-stream');
const containerName = 'resume';
const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService();

const handleError = (err, res) => {
    res.status(500);
    res.render('error', { error: err });
};




router.post("/user_profile",uploadStrategy.single('resume_file'),function(req,res){

console.log("here");
var uploadstatus=false;
var newblobname;
var userdata;
var fileUrl="";


if(!req.file){
	console.log("no file uploaded");
	processprofile(fileUrl,uploadstatus);
}else{

const blobName =((req.body.user_email)+"_"+"resume.pdf")
        , stream = getStream(req.file.buffer)
        , streamLength = req.file.buffer.length;
az.createContainer(containerName).then(()=>{
console.log('Container created');
});

console.log("blob is"+blobName)
newblobname=blobName;
console.log("blob name is"+newblobname);

az.uploadFile(containerName, blobName, stream, streamLength).then(()=>{
			uploadstatus=true;
    fileUrl = blobService.getUrl(containerName, blobName);
	processprofile(fileUrl,uploadstatus)
	console.log("url is "+fileUrl);
		}).catch((err)=>{
			console.log(err);
		});


}




 async function processprofile(fileUrl,uploadstatus)
{


console.log("status is "+uploadstatus);
console.log("this is "+fileUrl);
	var usertype=parseInt(req.body.user_Type);
	console.log(usertype);
	var user_email=req.body.user_email;
var user_fname=req.body.user_fname;
var user_lname=req.body.user_lname;
var user_mob=req.body.user_mob;
var gender=req.body.gender;
var community=req.body.user_community_arr;
 community=community.toString().split(',');
console.log(community);
var state=req.body.state_location;
var postcode=req.body.post_code;
var user_training=req.body.user_training;
 user_training=user_training.toString().split(',');
 console.log(user_training);
var user_event=req.body.user_event;
 user_event=user_event.toString().split(',');
var user_facebook=req.body.user_fb_id;
var user_twitter=req.body.user_twit_id;
var user_linkedin=req.body.lkn_id;
var user_website=req.body.website;
//var curr_loc= req.body.cur_loc;
var uni_name=req.body.uni_name;
var major=req.body.mjr;
var uni_class=req.body.class;
var year_of_completion=req.body.yoc;
var relevant_course=req.body.user_edu_relevant_course;
 relevant_course=relevant_course.toString().split(',');
 console.log(relevant_course);
var edu_achievement=req.body.user_edu_achievement;
 edu_achievement=edu_achievement.toString().split(',');
 console.log(edu_achievement);
var extracurr_activity=req.body.user_edu_extracuract;
extracurr_activity=extracurr_activity.toString().split(',');
console.log(extracurr_activity);
//work exp
var company_name=req.body.cname;
var company_loc=req.body.loc;
var start_date=req.body.startdate;
var end_date=req.body.enddate;
var position=req.body.position;
var summary_of_responsibility=req.body.sor;
var work_achievements=req.body.workexp_achievements;
work_achievements=work_achievements.toString().split(',');

//current employmemnt state
var current_emp_state=req.body.cur_emp_state;
var industry=req.body.industry;
 industry=industry.toString().split(',');
 console.log(industry);
//community connect
var skills=req.body.comm_skills;
 skills=skills.toString().split(',');
 console.log(skills);
var skills_to_learn=req.body.comm_skills_learn;
 skills_to_learn=skills_to_learn.toString().split(',');
var about_you=req.body.about_you;
var potential_matches=req.body.pot_mat;
 potential_matches=potential_matches.toString().split(',');
//volunteers
var vol_skill=req.body.vol_skill;
 vol_skill=vol_skill.toString().split(',');
console.log(vol_skill);
var vol_types=req.body.vol_types_arr;
 vol_types=vol_types.toString().split(',');
var vol_availability=req.body.vol_availability_obj;
console.log("this "+vol_availability);
if(typeof vol_availability!='undefined' && vol_availability.length>0){
var vol_availability=JSON.parse(vol_availability);
console.log(vol_availability);
for(var val in vol_availability)
{
	vol_availability[val]['time_from']=parseFloat(vol_availability[val]['time_from']);
	vol_availability[val]['time_to']=parseFloat(vol_availability[val]['time_to']);
	console.log(vol_availability[val]["time_from"]);
	console.log(vol_availability[val]["time_to"]);

}
var req_for;
var interested_vol=[];
var filtered_vol=[];
var final_vol=[]
var req_date;

console.log(vol_availability);
}else{
	vol_availability=[];
}
var file_url=fileUrl;
console.log("new fileurl"+file_url);


console.log("type of"+(typeof fileUrl));
console.log("this is new"+file_url);


var options = {
  'method': 'POST',
  'hostname': 'i-stem-app-v1.azurewebsites.net',
  'path': '/user/addUserInfo',
  'headers': {
    'Content-Type': 'application/json',
    'idtoken': token
  }
};

var reqs = https.request(options, function (resp) {
  var chunks = [];

  resp.on("data", function (chunk) {
    chunks.push(chunk);
  });

  resp.on("end", function (chunk) {
    var body = Buffer.concat(chunks).toString();
 console.log(body);
    var body=JSON.parse(body);
 console.log("here it is"+fileUrl);
 if((body.status==false) & ( uploadstatus==true))
 {
    blobService.deleteBlobIfExists(containerName, newblobname, err => {
            if (err) {
                console.log(err);
            } else {
                console.log("Block blob "+newblobname+" deleted ");
            }
        });

 }
          if(body.status==true)
          {
            res.send('file successfully added');
            res.render('index');
          }

  });

  resp.on("error", function (error) {

    console.error(error);
  });
});

var postData = { "email": user_email ,"userType": usertype,"firstName":user_fname,"lastName": user_lname,"mobile": user_mob,"gender": gender,"communities": community,"volunteers_skills": [vol_skill],"volunteers_types": vol_types,"volunteers_availability": vol_availability,"resume_url":file_url,"state":state,"post_code":postcode, "requests": [{"request_for": req_for ,"filtered_volunteers":filtered_vol,"interested_volunteers":interested_vol,"final_volunteers":final_vol,"request_date":req_date }],"initiatives": {"trainings": [user_training],"events": [user_event]},"profile": {"facebook": user_facebook,"twitter": user_twitter,"linkedin": user_linkedin,"website": user_website,"education": [{"university_name": uni_name,"major": major,"class": uni_class,"year_of_completion": year_of_completion,"relevant_courses": relevant_course,"achievements": edu_achievement,"extra_curriculars": extracurr_activity}],"work_experience": [{"company": company_name,"location": company_loc,"start_date": start_date,"end_date": end_date,"position": position,"summary_of_responsibilities": summary_of_responsibility,"achievements": work_achievements}],"current_employment_state": current_emp_state,"industry": industry},"community_connect": {"skills": skills,"skills_to_learn": skills_to_learn,"about_you": about_you,"potential_matches": potential_matches}};
var data=JSON.stringify(postData);

reqs.write(data);

reqs.end();



}

});

router.post("/admin_mail",uploadStrategy.single('attachment_file'),function(req,res){


var fileUrl;
var usertype=req.body.usertype;
var subject=req.body.mail_subject;
var message=req.body.admin_message;
console.log("message");
var typeval;
var returndata;

if(usertype=="student")
{
	typeval={
    userType:1
   };

	getdata(typeval).then((user_email)=>{
	mailing(user_email);
	});
}
else if(usertype=="volunteer")
{
  typeval={
    $or:[
      { userType:2 } ,{ userType:3 } , { userType:4 }
    ]
   };
	console.log(typeval);
	getdata(typeval).then((user_email)=>{
	mailing(user_email);
	});
}
else
{
  typeval={};
	getdata(typeval).then((user_email)=>{
	mailing(user_email);
	});

}

function mailing(user_email){
if(typeof(user_email)==null || !user_email>0)
{
	res.send("no recipient found");
}else{

if(req.file){
	console.log(user_email);
const blobName =req.file.originalname
        , stream = getStream(req.file.buffer)
        , streamLength = req.file.buffer.length;
az.createContainer(containerName).then(()=>{
console.log('Container created');
});

console.log(blobName);

az.uploadFile(containerName, blobName, stream, streamLength).then(()=>{
     fileUrl = blobService.getUrl(containerName, blobName);
	console.log("url is "+fileUrl);
	var url_path={ path : fileUrl };
	var attachment=[url_path];
	admin_mail(user_email,subject,message,attachment);

		}).catch((err)=>{
			console.log(err);
		});
}else
{
	var attachment=[];
	admin_mail(user_email,subject,message,attachment);
  res.send('hello email has been sent')
}

	}
}


});


router.post("/profile_update",uploadStrategy.single('resume_file'),function(req,res){

console.log("here");
var uploadstatus=false;
var newblobname;
var userdata;
var fileUrl="";


if(!req.file){
	console.log("no file uploaded");
	processprofile(fileUrl,uploadstatus);
}else{

const blobName =((req.body.user_email)+"_"+"resume.pdf")
        , stream = getStream(req.file.buffer)
        , streamLength = req.file.buffer.length;
az.createContainer(containerName).then(()=>{
console.log('Container created');
});

console.log("blob is"+blobName)
newblobname=blobName;
console.log("blob name is"+newblobname);

az.uploadFile(containerName, blobName, stream, streamLength).then(()=>{
			uploadstatus=true;
    fileUrl = blobService.getUrl(containerName, blobName);
	processprofile(fileUrl,uploadstatus)
	console.log("url is "+fileUrl);
		}).catch((err)=>{
			console.log(err);
		});


}





function processprofile(fileUrl,uploadstatus)
{


console.log("status is "+uploadstatus);
console.log("this is "+fileUrl);
	var usertype=parseInt(req.body.user_Type);
	console.log(usertype);
	var user_email=req.body.user_email;
var user_fname=req.body.user_fname;
var user_lname=req.body.user_lname;
var user_mob=req.body.user_mob;
var gender=req.body.gender;
var community=req.body.user_community_arr;
var community=community.toString().split(',');
console.log(community);
var state=req.body.state_location;
var postcode=req.body.post_code;
var user_training=req.body.user_training;
var user_training=user_training.toString().split(',');
var user_event=req.body.user_event;
var user_event=user_event.toString().split(',');
var user_facebook=req.body.user_fb_id;
var user_twitter=req.body.user_twit_id;
var user_linkedin=req.body.lkn_id;
var user_website=req.body.website;
//var curr_loc= req.body.cur_loc;
var uni_name=req.body.uni_name;
var major=req.body.mjr;
var uni_class=req.body.class;
var year_of_completion=req.body.yoc;
var relevant_course=req.body.user_edu_relevant_course;
var relevant_course=relevant_course.toString().split(',');
var edu_achievement=req.body.user_edu_achievement;
var edu_achievement=edu_achievement.toString().split(',');
var extracurr_activity=req.body.user_edu_extracuract;
var extracurr_activity=extracurr_activity.toString().split(',');
//work exp
var company_name=req.body.cname;
var company_loc=req.body.loc;
var start_date=req.body.startdate;
var end_date=req.body.enddate;
var position=req.body.position;
var summary_of_responsibility=req.body.sor;
var work_achievements=req.body.workexp_achievements;
var work_achievements=work_achievements.toString().split(',');

//current employmemnt state
var current_emp_state=req.body.cur_emp_state;
var industry=req.body.industry;
var industry=industry.toString().split(',');
//community connect
var skills=req.body.comm_skills;
var skills=skills.toString().split(',');
var skills_to_learn=req.body.comm_skills_learn;
var skills_to_learn=skills_to_learn.toString().split(',');
var about_you=req.body.about_you;
var potential_matches=req.body.pot_mat;
var potential_matches=potential_matches.toString().split(',');
//volunteers
var vol_skill=req.body.vol_skill;
var vol_skill=vol_skill.toString().split(',');
console.log(vol_skill);
var vol_types=req.body.vol_types_arr;
var vol_types=vol_types.toString().split(',');
var vol_availability=req.body.vol_availability_obj;
console.log("this "+vol_availability);
if(typeof vol_availability!='undefined' && vol_availability.length>0){
var vol_availability=JSON.parse(vol_availability);
console.log(vol_availability);
for(var val in vol_availability)
{
	vol_availability[val]['time_from']=parseFloat(vol_availability[val]['time_from']);
	vol_availability[val]['time_to']=parseFloat(vol_availability[val]['time_to']);
	console.log(vol_availability[val]["time_from"]);
	console.log(vol_availability[val]["time_to"]);

}
var old_blob=req.body.old_file_name;
var req_for;
var interested_vol=[];
var filtered_vol=[];
var final_vol=[]
var req_date;

console.log(vol_availability);
}else{
	vol_availability=[];
}
var file_url=fileUrl;
console.log("new fileurl"+file_url);


console.log("type of"+(typeof fileUrl));
console.log("this is new"+file_url);


console.log("update");

var options = {
  'method': 'PUT',
  'hostname': 'i-stem-app-v1.azurewebsites.net',
  'path': '/user/updateUserInfo',
  'headers': {
    'Content-Type': 'application/json',
    'idtoken': token
  }
	};

var reqs = https.request(options, function (resp) {
  var chunks = [];

  resp.on("data", function (chunk) {
    chunks.push(chunk);
  });

  resp.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
	console.log(body.toString());
    var body=JSON.parse(body.toString());
	console.log("here it is"+fileUrl);
	if((body.status==false) & ( uploadstatus==true))
	{
		 blobService.deleteBlobIfExists(containerName, newblobname, err => {
            if (err) {
                console.log(err);
            } else {
                console.log("Block blob "+newblobname+" deleted ");
            }
        });

	}

  if((body.status==true) & ( uploadstatus==true))
  {
     blobService.deleteBlobIfExists(containerName, old_blob, err => {
            if (err) {
                console.log(err);
            } else {
                console.log("Block old blob "+newblobname+" deleted ");
            }
        });

  }


           if(body.status==true)
           {
             res.send('file successfully updated');
             res.render('index');
           }


  });

  resp.on("error", function (error) {

    console.error(error);
  });
});

var postData = { "email": user_email ,"userType": usertype,"firstName":user_fname,"lastName": user_lname,"mobile": user_mob,"gender": gender,"communities": community,"volunteers_skills": [vol_skill],"volunteers_types": vol_types,"volunteers_availability": vol_availability,"resume_url":file_url,"State":state,"post_code":postcode, "requests": [{"request_for": req_for ,"filtered_volunteers":filtered_vol,"interested_volunteers":interested_vol,"final_volunteers":final_vol,"request_date":req_date }],"initiatives": {"trainings": [user_training],"events": [user_event]},"profile": {"facebook": user_facebook,"twitter": user_twitter,"linkedin": user_linkedin,"website": user_website,"education": [{"university_name": uni_name,"major": major,"class": uni_class,"year_of_completion": year_of_completion,"relevant_courses": [relevant_course],"achievements": [edu_achievement],"extra_curriculars": [extracurr_activity]}],"work_experience": [{"company": company_name,"location": company_loc,"start_date": start_date,"end_date": end_date,"position": position,"summary_of_responsibilities": summary_of_responsibility,"achievements": [work_achievements]}],"current_employment_state": current_emp_state,"industry": [industry]},"community_connect": {"skills": [skills],"skills_to_learn": [skills_to_learn],"about_you": about_you,"potential_matches": [potential_matches]}};
var data=JSON.stringify(postData);

reqs.write(data);

reqs.end();

}




});


router.use('/login', (req, res)=>{
res.render('login');
});
router.use('/signup',(req,res)=>{
res.render('signup');
});

router.use('/passwdreset', (req,res)=>{
  res.render('passwdreset');
});
router.use('/volunteer',isuserloggedin, function(req, res) {
  res.render('volunteers.hbs', { title: 'Express' });
});

router.use("/update",getUser,function(req,res){
	var data=res.locals.data;

	res.render('update.hbs',{data:JSON.stringify(data.data)});

});

router.use("/profile",isuserloggedin,function(req,res){
	res.render('profile');

});

router.use("/profileview",getUser,function(req,res){
  var data=res.locals.data;
  console.log(data);
  res.render('profileview.hbs',{data:JSON.stringify(data.data)});

});

router.use("/index",function(req,res){
	res.render('index');

});
router.use("/mail",function(req,res){
	res.render('mail');

});
router.use("/istemusers",getallUser,function(req,res){
  var data=res.locals.data;
  console.log(data);
  res.render('stemusers.hbs',{data:JSON.stringify(data.data)});
});



module.exports=router;
