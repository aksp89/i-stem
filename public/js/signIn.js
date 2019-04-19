function validatePassword() {
  // Empty check
  if (checkIfEmpty(password)) return;
  // Must of in certain length
  if (!meetLength(password, 4, 100)) return;
  // check password against our character set
  // 1- a
  // 2- a 1
  // 3- A a 1
  // 4- A a 1 @
  //   if (!containsCharacters(password, 4)) return;
  return true;
}
function validateConfirmPassword() {
  if (password.className !== 'valid') {
    setInvalid(confirmPassword, 'Password must be valid');
    return;
  }
  // If they match
  if (password.value !== confirmPassword.value) {
    setInvalid(confirmPassword, 'Passwords must match');
    return;
  } else {
    setValid(confirmPassword);
  }
  return true;
}
function validateEmail() {
  if (checkIfEmpty(email)) return;
  if (!containsCharacters(email, 5)) return;
  return true;
}


function SignIn() {
  if (firebase.auth().currentUser) {

    firebase.auth().signOut();


  } else {

    var email = document.getElementById('login_email').value;
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email))
      {
        alert("invalid email");
        return;
      }
    var password = document.getElementById('login_password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if ((password.length < 4)  || (password.length>20) || (password.length<0) ) {
      alert('Password should not be empty or between 5 to 20 characters.');
      return;
    }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
  console.log(user);
     if(user.user.emailVerified) {
       alert("User is successfully login");
       firebase.auth().currentUser.getIdToken(true).then((a) => {
       $.post('/password-authentication/user_auth',{ token: a },function(data,status)
       {
         localStorage.setItem("token",a);
         localStorage.setItem("exp-time",user.user.exp);
         console.log("data returned is"+data);
         alert(data)
         if(data==true);
         {
           window.location='/index';
         }
         if(data===false){
           window.location='/profile';
         }
       }).then(()=>{
          var now = new Date().getTime();
         localStorage.setItem('setupTime', now);
       });
     });
     }else
     {
        let currentUser = firebase.auth().currentUser;
                currentUser.sendEmailVerification().then(() => {

                                alert("error: Please verify your account. Verification mail is sent to you.");
                                window.location = "http://localhost:3000";
                            });
   }




}).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);

      // [END_EXCLUDE]
    });
    // [END authwithemail]
  }

}



function googleSignIn(){
			firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
				.then((result) => {
					var credential=result.credential.idToken;

          firebase.auth().currentUser.getIdToken(true).then((a) => {
            //console.log(a);

            $.post('/password-authentication/user_Auth',{ token: a },function(data,status)
            {
              var now = new Date().getTime();
              localStorage.setItem('setupTime', now);
              if(data=='true')
              {
                window.location='/index';
              }else{
                window.location='/profile';
              }
            });
          }).catch((err) => {
          console.log(err);
        });


				}).catch((err) => {
					console.log(err);
				});
			//	isuserloggedin();
		}
