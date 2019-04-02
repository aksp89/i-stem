
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);

async function getUserInfo(token){	
var result=await $.ajax({
	"url": "https://cors-anywhere.herokuapp.com/https://i-stem-app-v1.azurewebsites.net/user/getUserInfo",

	beforeSend: function(xhr){
		xhr.setRequestHeader("idtoken", token );
	},
	"type": "GET",
	"data":""
    });
		return result;

  console.log("result is"+result);

}



async function getAllUserInfo(token){
	var result=await $.ajax({
	"url": "https://cors-anywhere.herokuapp.com/https://i-stem-app-v1.azurewebsites.net/user/getAllUsers",

	beforeSend: function(xhr){
		xhr.setRequestHeader("idtoken", token);
	},
	"type": "GET",
	"data":""
    });
		return result;
}

async function postRequest(token, vol_type, filtered_volunteers){
var jsonData = {"requests": [{"request_for": vol_type, "filtered_volunteers": filtered_volunteers}]};
	var stringData = JSON.stringify(jsonData);
$.ajaxSetup({
headers: {'Content-Type': 'application/json', 'idtoken': token}
});
	var result=await $.ajax({
	"url": "https://cors-anywhere.herokuapp.com/https://i-stem-app-v1.azurewebsites.net/user/updateUserInfo",
	"type": "PUT",
	"data":stringData
    });
		return result;
}

module.exports={
	getUserInfo,getAllUserInfo,postRequest

};
