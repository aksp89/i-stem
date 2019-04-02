var { idtoken }=require("../controllers/authentication/password-authentication")
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);
const { DbConnection } = require("../config/database/db_connection");
const { UserModel } = require("./user-model");
const { UserInfoModel } = require("./user-info-model");
const { Authentication } = require("../controllers/firebase/authentication");
var https = require('https');
async function query(userType){

	resultlist=[];
	await UserInfoModel.getSchema().find(userType,{ email:1,_id:0} ).exec().then((result)=>{
	result.forEach((value)=>{

		resultlist.push(value.email);
		console.log(value.email);
	});
	});
	//console.log(resultlist);
	return resultlist;
}

exports.checkinfo=async function(usermail)
{

		if(DbConnection.dbConnect()){

		 var result=await UserInfoModel.getSchema().findOne({ login_mail:usermail }).exec();
		if(result){
			 return true;
		}else{
			return false;
		}


}
}
exports.isadmin =async function(idtoken)
{
  var decodedtoken=await new Authentication().verifyIdToken(idtoken);
	var userid=decodedtoken.user_id;
	console.log(decodedtoken.email);
		console.log("userid is"+userid);
	 if(DbConnection.dbConnect()){
 	 		var result=await UserModel.getSchema().findOne({ userId:userid }).exec();
			console.log("result isadmin is"+result.isAdmin);
			if(result.isAdmin)
			{

				return true

			}else {
				return false
			}

}
}


exports.adduser=async function (email,idtoken){
	console.log("the toke here is "+token);
	var settings = {
  "url": "https://cors-anywhere.herokuapp.com/https://i-stem-app-v1.azurewebsites.net/user/addUser",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/json",
    "idtoken": idtoken,
    "email": email
  },
};

var result=await $.ajax(settings);
return result.data;
}


 async function getdata(usertype)
{
	//var result=[];

	DbConnection.dbConnect().then((res)=>{
	//{ userType:3} , {email:1, _id:0}
	//console.log("database connected");




}).catch((err)=>{
	console.log(err);
});

	let newresult = await query(usertype);
	return newresult;




}

async function adminVerify(userid){
 if(DbConnection.dbConnect()){
		var result=await UserModel.getSchema().findOne({ userId:userid }).exec();
		console.log("result isadmin is"+result.isAdmin);
		if(result.isAdmin)
		{
			admin_exist=true
			return true;
		}else {
			return false
		}
}
}
function routing(req,res){




}


function isuserloggedin(req,res,next){
new Authentication().verifyIdToken(token).then((user)=>{
	if(user){
		if(profileExist){
			next()
		}else{
			//res.send('please fill your profile')
		res.render('profile');
	}
	}else{
		res.render('login');
	}

})

}

function isadminloggedin(req,res,next){
new Authentication().verifyIdToken(token).then((user)=>{
	if(!admin_exist){
	var userid=user.user_id;
	adminVerify(userid).then((admin)=>{
		if(admin){
		admin_exist=true;
	}else {
		console.log("error");
		return;
	}
});
}
	if(user){
		if(profileExist){
			next()
		}else{
			res.send('please fill your profile')
		res.render('profile');
	}
	}else{
		res.render('login');
	}

})

}


 async function getUser(req,res,next){
res.locals.data=await $.ajax({
	"url": "https://cors-anywhere.herokuapp.com/https://i-stem-app-v1.azurewebsites.net/user/getUserInfo",

	beforeSend: function(xhr){
		xhr.setRequestHeader("idtoken",token);
	},
	"type": "GET",
	"data":""
}).done((data)=>{
	console.log(data);
		console.log('success');
	}).catch(()=>{
		console.log('error');
	});
  next();

}

async function getallUser(req,res,next){
res.locals.data=await $.ajax({
 "url": "https://cors-anywhere.herokuapp.com/https://i-stem-app-v1.azurewebsites.net/user/getAllUsers",

 beforeSend: function(xhr){
	 xhr.setRequestHeader("idtoken",token);
 },
 "type": "GET",
 "data":""
	 }).done(()=>{
	 console.log('success');
 }).catch((err)=>{
	 console.log(err);
 });
 next();

}





function request()
{

	DbConnection.dbConnect().then((res)=>{
	//console.log(res);
	var obj={ 'request_for' :2, 'filtered_volunteers' : ["email1","email2"],  'interested_volunteers' : ["email1"] , 'final_volunteers' :["email1"] };

	//var obj=JSON.stringify(obj);

	UserInfoModel.getSchema().updateOne({ email : "kas005@chowgules.ac.in" },{ $push : { 'requests' : obj }  } ).exec().then((data)=>{
		console.log("success");
				console.log(data);
	}).catch((err)=>{
		console.log(err);
	});
	});

}
module.exports={
getallUser,
getUser,
isuserloggedin,
isadminloggedin,
getdata
};
