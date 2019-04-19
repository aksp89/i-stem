const express=require("express");
const { PasswordAuthenticate } =require('./../controllers/authentication/password-authentication');

class passwordroutes{
	constructor(){
		this.router= express.Router();
		this.init();

	}
		init(){

			this.router
		  .post("/user_auth",PasswordAuthenticate.user_Auth)
			.get("/session-signout",PasswordAuthenticate.signout)
			.get("/toggle-signin",PasswordAuthenticate.togglelogin);
		}
	}


module.exports={
 passwordroutes
 };
