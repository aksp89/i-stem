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
            localStorage.removeItem('exp-time');
            localStorage.removeItem('token');
            $.get('/password-authentication/session-signout',function(data,status)
            {
                console.log("signout response"+data);
            });
        })
        .catch((err) => {
                alert(err);
            });
          isuserloggedin();
		}



async function isuserlloggedin(){

  $.get('/password-authentication/toggle-signin',function(data,status)
  {
    console.log("data returned is"+data);
    if(data=="useradmin")
    {
      admin();
    }
    if(data=="user")
    {
      user();
    }
    if(data=="nouser")
    {
      nouser();
    }


  });
}


function generate_token(){
  firebase.auth().onAuthStateChanged(function(user) {
    var lastsignin=new Date(user.metadata.lastSignInTime);
    var now = new Date().getTime();
    lastsignin=lastsignin.getTime();
    if(now-lastsignin>(24*60*60*1000))
    {
        alert("user has been signed out")
        signOut();
    }
  else if((user) && (user.emailVerified)) {
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
} else {
  {
    console.log("something went wrong");
  }
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
    console.log(data);
    console.log(status);
      console.log(token);
  }).catch((err)=>{
    console.log(err);
  });
}else{
  localStorage.removeItem('exp-time');
  generate_token();
}
}
}

function admin(){
  var adminvalue='<li class="nav-item dropdown"><a class="nav-link dropdown-toggle color-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">User</a><div class="dropdown-menu" aria-labelledby="navbarDropdown"><a class="dropdown-item" href="profileview">User Profile</a><a class="dropdown-item" href="istemusers">All Users</a><a class="dropdown-item" href="" onclick="signOut()">sign out</a></div></li>'
  document.getElementById('login-status').innerHTML=adminvalue;
}
function isUser(email){
  var users='<li class="nav-item dropdown"><a class="nav-link dropdown-toggle color-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+email+'</a><div class="dropdown-menu" aria-labelledby="navbarDropdown"><a class="dropdown-item" href="profileview">User Profile</a><a class="dropdown-item" href="" onclick="signOut()">sign out</a></div></li>'
  document.getElementById('login-status').innerHTML=users;
}
function nouser(){
  var nouser='<li class="nav-item"><a class="nav-link color-white" href="login">Login</a></li>';
  document.getElementById('login-status').innerHTML=nouser;
  localStorage.removeItem('setadmin');
}


function togglesignin(){
//  var auth=localStorage.getItem('onauth')
  console.log("ayuth is"+auth);
  if(auth=='checked'){
  //var user = localStorage.getItem('setadmin');
  if(user=='true')
  {
    admin();
  }else if(user=='false')
  {
    user();
  }else if(user==null){
    nouser();
  }
}
}

async function isuserloggedin(){


      // localStorage.setItem("onauth",'checked');
firebase.auth().onAuthStateChanged(function(user) {
  if((user) && (user.emailVerified))
{
  isUser(user.email);
    }else
                {

                    nouser();

                }
                });
              }

window.onload=function(){
sendtoken();
isuserloggedin();
}

//setInterval(sendtoken,(55*60*1000));
