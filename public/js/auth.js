/*
var config = {

			apiKey: "AIzaSyDwBiGVQSX948mfAjWruQbGcPLnIeUBQ5Y",
			authDomain: "istem-testing.firebaseapp.com",
			databaseURL: "https://istem-testing.firebaseio.com",
			projectId: "istem-testing",
			storageBucket: "istem-testing.appspot.com",
			messagingSenderId: "938429612260"
};

*/
 var config = {
    apiKey: "AIzaSyBv9lz14gpWNzD9IGcZNyNxlDz-U2FOA84",
    authDomain: "i-stem-b5a96.firebaseapp.com",
    databaseURL: "https://i-stem-b5a96.firebaseio.com",
    projectId: "i-stem-b5a96",
    storageBucket: "i-stem-b5a96.appspot.com",
    messagingSenderId: "557329230461"
  };

firebase.initializeApp(config);
var token;
var getExpTime;
function homepage(){

	window.location = "http://localhost:3000";
}


		function signOut() {
        firebase.auth().signOut().then((a) => {
            localStorage.removeItem('setadmin');
            localStorage.removeItem('exp-time');
            localStorage.removeItem('token');


        })
        .catch((err) => {
                alert(err);
            });
     isuserloggedin();
		}



async function isuserloggedin(){


      // localStorage.setItem("onauth",'checked');
firebase.auth().onAuthStateChanged(function(user) {
  if((user) && (user.emailVerified))
{
    var admin=localStorage.getItem('setadmin');
    console.log(admin);
    if(admin=='true'){
      //  localStorage.setItem('setadmin',true);
        useradmin()
      }
       if(admin=='false'){
        //localStorage.setItem('setadmin',false);
        nonadmin()
      }
    if(admin==null){
      var email=user.email;
      console.log(email);
    if(email.includes("chowgules"))
    {
      localStorage.setItem('setadmin',true);
      useradmin();
    } else{
      localStorage.setItem('setadmin',false);
      nonadmin();
    }
                    }

	 console.log("user bro logged in");
        }
                else
                {
                localStorage.removeItem('setadmin');
                    nouser();

                }
                });
              }



function generate_token(){
  firebase.auth().onAuthStateChanged(function(user) {
  if ((user) && (user.emailVerified)) {
  firebase.auth().currentUser.getIdToken(true).then((a) => {
    $.post('/password-authentication/user_auth',{ token: a },function(data,status)
    {

        var now = new Date().getTime();
      localStorage.setItem("exp-time",(now+(55*60*1000)) );
      localStorage.setItem("token",a);



  }).catch((err) => {
  console.log(err);
});
});
}

});
}

function sendtoken(){
  if(localStorage){
  var now = new Date().getTime();
  token=localStorage.getItem('token');
  getExpTime=localStorage.getItem('exp-time');
  if((token)&& (getExpTime) && (getExpTime>now))
  {
  $.post('/password-authentication/user_auth',{ token: token },function(data,status)
  {

  }).catch((err)=>{
    console.log(err);
  });
}else{
  localStorage.removeItem('exp-time');
  generate_token();
}
}
}

function useradmin(){
  var adminvalue='<div id="dropdown_admin"><div class="dropdown"><button class="dropbtn">admin<i class="fa fa-caret-down"></i></button><div class="dropdown-content"><a href="profileview">user profile</a><div id="alluser"><a href="istemusers">All user</a></div><a href="" onclick="signOut()">sign out</a></div></div></div>'
  document.getElementById('admin').innerHTML=adminvalue;
}
function nonadmin(){
  var users='<div id="dropdown"><div class="dropdown"><button class="dropbtn">user<i class="fa fa-caret-down"></i></button><div class="dropdown-content"><a href="profileview">user profile</a><a href="" onclick="signOut()">sign out</a></div></div></div>'
  document.getElementById('user').innerHTML=users;
}
function nouser(){
  var nouser='<a href="login">login</a>';
  document.getElementById('login').innerHTML=nouser;
  localStorage.removeItem('setadmin');
}
/*
function togglesignin(){
//  var auth=localStorage.getItem('onauth')
  console.log("ayuth is"+auth);
  if(auth=='checked'){
  //var user = localStorage.getItem('setadmin');
  if(user=='true')
  {
    useradmin();
  }else if(user=='false')
  {
    nonadmin();
  }else if(user==null){
    nouser();
  }
}
}
*/


window.onload=function(){
sendtoken();
isuserloggedin();
}

//setInterval(sendtoken,(55*60*1000));
