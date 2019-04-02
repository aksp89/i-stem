function signup(){
var email=document.getElementById('signup_mail').value;

var passwd=document.getElementById('signup_passwd').value;
var confirmpass=document.getElementById('confirm_pass').value;
if ((passwd.length < 4)  || (passwd.length > 20) || (!passwd.length>0) ) {
  alert('Password should not be empty or between 5 to 20 characters.');
  return;
}
if ((confirmpass.length < 4) || (confirmpass.length > 20) || (confirmpass.length< 0) ) {
  alert('Password should not be empty or between 5 to 20 characters.');
  return;
}
    if(passwd==confirmpass){
    firebase.auth().createUserWithEmailAndPassword(email,passwd).then(function(user){
alert("user signing up");

              let currentUser = firebase.auth().currentUser;
              return currentUser.sendEmailVerification();

    }).then(()=>{
      alert("User is successfully created. Please verifiy your account");
      window.location = "http://localhost:3000";
      console.log(token);
      firebase.auth().signOut();


  }).catch(function(error){
      var errorCode=error.code;
      var errorMessage=error.message;
      if(errorCode='auth/weak-password'){
        //alert('The password is too weak.');
      }else {
        alert(errorMessage);
      }
      console.log(error);

  });

  }else
  {
    alert("password did not match match");
    return;
  }

}
