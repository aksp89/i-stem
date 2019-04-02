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
var useradded=false;
var tokensent=false;
var profileupdated=false;
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
    console.log(req.body.token);
 var idtoken=req.body.token;
 global.token=idtoken;

console.log("user after function"+useradded);
if(!req.session.useradded)
{
  new Authentication().verifyIdToken(token).then(function(decodedToken){
    var email=decodedToken.email;
    console.log(decodedToken);
    testmodel.adduser(email,token).then((response)=>{
      console.log(response);
      req.session.useradded=true;
  }).catch((error)=>{
    console.log(error);
  });
}).catch((err)=>{
  console.log(err);
})
}
if(!req.session.profileupdated)
{
  console.log("user not added");
new Authentication().verifyIdToken(idtoken).then(function(decodedToken){
  var usermail=decodedToken.email;
  testmodel.checkinfo(usermail).then((data)=>{
    console.log("data iss"+data);
  if(data){
    profileupdated=true;
    res.send(data)
  }else{
    res.send(data)
    profileupdated=false;
  }
  //console.log("profile updated"+profileupdated);
}).catch((err)=>{
  console.log(err);
  console.log("here ther error");
});

}).catch((err)=>{
  console.log(err);
  console.log("here error 2");
});


}

}





}








// PasswordAuthenticate.init();
module.exports = {
 PasswordAuthenticate
};
