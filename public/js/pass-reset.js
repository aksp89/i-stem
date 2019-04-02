function emailreset(){
var email=document.getElementById('reset_passwd_id').value;
if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    alert("invalid email");
    return;
  }
firebase.auth().sendPasswordResetEmail(email).then(function(){
  alert('password reset email sent to your registered email');
}).catch(function(error){
  var errorCode=error.code;
  var errorMessage=error.message;
  if(errorCode=='auth/invalid-email'){
    alert(errorMessage);
  }
    else if(errorCode=='auth/user-not-found'){
      alert(errorMessage);
    }else{
    console.log(error);
  }
  });

}
