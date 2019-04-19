const firebase = require("firebase");
const { DbConnection } = require("../../config/database/db_connection");
const admin=require("firebase-admin");
var testmodel = require("../../models/test-model")
const express = require("express");
var path=require('path');
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
var $ = jQuery = require('jquery')(window);
const app = express();
const { Authentication } = require("../firebase/authentication");


const testingAccount = require("./../../config/firebase/config");
 //const serviceAccount = require("./../../config/firebase-admin_sdk");

class PasswordAuthenticate {
    static init() {
        firebase.initializeApp(testingAccount.web_config);
        // firebase.initializeApp(serviceAccount.web_config);
    }
	static user_Auth(req,res){
 var idtoken=req.body.token;
 global.token=idtoken;
 console.log("token is"+token);
 
if(!req.session.profilecheck)
{
//  console.log("user not added");
new Authentication().verifyIdToken(idtoken).then(function(decodedToken){
  req.session.profilecheck=true;
  req.session.usertoggle=true;
  //req.session.isadmin=testmodel.adminVerify(decodedToken.user_id);
  var usermail=decodedToken.email;
  testmodel.checkinfo(usermail,idtoken).then((data)=>{
  //  console.log("data iss"+data);
    req.session.usersName=data[1];
    req.session.usersEmail=usermail;
  if(data[0]===true){
    req.session.profileupdated=true;
    res.send(data[0])
  }if(data===false){
    res.send(data);
  }
  //console.log("profile updated"+profileupdated);
}).catch((err)=>{
  console.log(err);
    res.send(true);
});

}).catch((err)=>{

});


}

}

static togglelogin(req,res)
{

console.log("toggle"+req.session.usertoggle);
if(req.session.usertoggle==true){

if(req.session.isadmin==true)
{
    res.send("useradmin");
}

if(req.session.isadmin==false)
{
    res.send("user");
}

if(req.session.isadmin==null)
{
  var email=req.session.usersEmail;
  if(email.includes("chowgules"))
  {
    res.send("useradmin");
  }
  else {
    res.send("user");
  }
}

}else{
  res.send("nouser");
      }

}

  static signout(req,res){
    req.session.destroy();
    res.send("session destroyed")
  }


}








// PasswordAuthenticate.init();
module.exports = {
 PasswordAuthenticate
};
