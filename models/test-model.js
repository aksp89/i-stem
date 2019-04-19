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

exports.checkinfo=async function(usermail,idtoken)
{

		if(DbConnection.dbConnect()){

		 var result=await UserInfoModel.getSchema().findOne({ login_mail:usermail },{_id:0,firstName:1,lastName:1}).exec();

		if(result){
			var name=result.firstName+" "+result.lastName;
				return [true,name];
		}else{
			console.log("add user");
			var response=await adduser(usermail,idtoken);
			if(response==true)
			{
				return false;
			}




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
//python -m rasa_core.run -d models/dialogue -u models/nlu/default/stem_nlu --enable_api --credentials credentials.yml --cors "*"

  async function adduser(email,idtoken){
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

 var result= await $.ajax(settings);
	 console.log("data is is"+result.status);
	 //console.log(data);
		return result.status;
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

exports.adminVerify=async function(userid){
 if(DbConnection.dbConnect()){
		var result=await UserModel.getSchema().findOne({ userId:userid}).exec();
		console.log("result is"+result);
		console.log("result isadmin is"+result.isAdmin);
		if(result.isAdmin==true)
		{
			return true;
		}else if(result.isAdmin==false){
			return false
		}else {
			return null
		}
}
}

function routing(req,res){




}

async function userdata(userEmail){
		if(DbConnection.dbConnect()){

		 var result=await UserInfoModel.getSchema().findOne({ login_mail:userEmail }).exec();
		if(result){
			return true;
		}else{
			return false;
}
}
}

async function isuserloggedin(req,res,next){
	console.log("gere");
	if(typeof token !== 'undefined'){

new Authentication().verifyIdToken(token).then((user)=>{

	if(user){
		if(req.session.profileupdated){
			next();
		}else{
			//res.send('please fill your profile')

					userdata(user.email).then((profile_status)=>{
						console.log("inside");
			if(profile_status)
			{
				req.session.profileupdated=true;
				next();
			}else{
				res.render('profile');
			}
		});
}
	}else{
		res.send('<html><head></head><body> '+
			'<script> alert("you are not authorize to view the page , you need to login first"); window.location="/login" </script>'+
			'</body></html>');
	}

}).catch((err)=>{
	console.log(err);
});
}else {
	res.send('<html><head></head><body> '+
		'<script> alert("you are not authorize to view the page , you need to login first"); window.location="/login" </script>'+
		'</body></html>');
}

}

 function isadminloggedin(req,res,next){
new Authentication().verifyIdToken(token).then((user)=>{
	var userid=user.user_id;
	adminVerify(userid).then((admin)=>{
		if(admin==true){
		next();
	}else {
		res.send('<html><head></head><body> '+
			'<script> alert("you are not authorize to view the page , you need to login first"); window.location="/login" </script>'+
			'</body></html>');
	}
});
}).catch((err)=>{
	console.log(err);
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
	}).catch((err)=>{
		console.log(err);
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
