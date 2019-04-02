var email=$('#user_email').val();

function isEmpty(value){
  if(value === '') return true:
  return false;
}
function checkIfEmpty(field)
{
  if(isEmpty(field.value.trim())){

    setInvalid(field,'${field.name} must not be empty');
    return true;
  } else {
    setValid(field)
    return false;
  }
}

function checkIfLetter(field)
{
  if(/^[A-Za-z]+$/.test(field)){
    setValid(field);
    return true;
  }else{
    setInvalid(field,'${field.name} must be only letter')
    return false;
  }
}

function checkEmail(field){
  if((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(field)){
    setValid(field);
    return true;
  }else{
    setInvalid(field,'${field.name} is not valid');
  }
}

function setValid(field,message){
  field.className='invalid';
  field.nextElementSibling.innerHTML=message;
  field.nextElementSibling.style.color=red
}

function setInvalid(field){
  field.className='valid';
  field.nextElementSibling.innerHTML='';
  field.nextElementSibling.style.color=green;
}
function validate_email()
{
  if(isEmpty(email)) return;

  if(!checkIfLetter(firstName)) return;

  return true;

}

function formValidate(){

  var voltypes=[];
  var usercomm=[];

  $("input:checkbox[name=vol_types]:checked").each(function() {
         voltypes.push(parseInt($(this).val()));
  	  // alert(voltypes);
    });

    $('#vol_types_arr').val(voltypes);

  $("input:checkbox[name=user_community]:checked").each(function() {
         usercomm.push($(this).val());
  	// alert(usercomm);
    });
    $('#user_community_arr').val(usercomm);


var letter=/^[A-Za-z]+$/
var letterwithws=/^[A-Za-z\s]+$/
var phonenum=/^[0-9]+$/
var urlregex=/\b((http|https):\/\/?)[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/g
var usertype=$('input[name=user_Type]').is(':checked');
if(!usertype){
  return false;
}
var email=$('#user_email').val();
if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email))
  {
    alert("invalid email");
    return false;
  }
var firstname=$('#user_fname').val();
if(firstname==" " || (!firstname.length>0)){
  alert("name shouldnt be empty")
  return false;
}
if(!letter.test(firstname)){
  alert("name should contain only letter")
  return false;
}
var lastname=$('#user_lname').val();
if(lastname==" " || (!lastname.length>0)){
  alert("name shouldnt be empty")
  return false;
}
if(!letter.test(lastname)){
  alert("name should contain only letter")
  return false;
}

var mobile=$('#user_mob').val();
if((!phonenum.test(mobile))&&(!mobile.length==10)){
alert("wrong input for mobile")
  return false;
}




var gender=$('input[name=gender]').is(':checked');
if(!gender){
  alert("gender needs to be checked")
  return false;
}
var communities=$('input[name=user_community]').is(':checked');
if(!communities){
  alert("communities must be selected")
  return false;
}
var state=$('#state_location').val();
if(!state.length>0){
  alert("state shouldnt be empty")
  return false;
}
if(!letter.test(state)){
  alert("state should contain letters")
  return false;
}
var postal_code=$('#post_code').val();
if(!postal_code.length>0){
  alert("postal shouldnt be empty")
  return false;
}
if(!phonenum.test(postal_code)){
  alert("wrong input for postal")
  return false;
}


var facebook=$('#user_fb_id').val();
if(facebook.length>0){
  if(!urlregex.test(facebook)){
alert("wrong facebook url")
    return false;
  }
}
var twitter=$('#user_twit_id').val();
if(twitter.length>0){
  if(!urlregex.test(twitter)){
alert("wrong twitter url")
    return false;
  }
}
var linkedin=$('#lkn_id').val();
if(linkedin.length>0){
  if(!urlregex.test(linkedin)){
    alert("wrong linkdin url")
    return false;
  }
}
var website=$('#website').val();
if(website.length>0){
  if(!(/[^w{3}.]([a-zA-Z0-9]([a-zA-Z0-9-]{0,65}[a-zA-Z0-9])?.)+[a-zA-Z]{2,6}/igm).test(website)){
    alert("wrong website domain name")
    return false;
  }
}
var universityname=$('#uni_name').val();
if(universityname.length>0){
  if(!letterwithws.test(universityname)){
    alert("university name should contain only letter")
    return false;
  }
}
var uni_major=$('#mjr').val();
if(uni_major.length>0){
  if(!letterwithws.test(uni_major)){
    alert("university major name should contain only letter")
    return false;
  }
}
var uni_class=$('#class').val();
if(uni_class.length>0){
  if(!letterwithws.test(uni_class)){
    alert("university class should contain only letter")
    return false;
  }
}

var yoc=$('#yoc').val();
if(yoc.length>0){
  if(!(/^[0-9]$/).test(yoc)){
alert( "year of completion should be number")
    return false;
  }
}
var relevant_course=$('#user_edu_relevant_course').val();
var achievement=$('#user_edu_achievement').val();
var extracur_act=$('#user_edu_extracuract').val();

var company=$('#cname').val();
if(company.length>0){
  if(!(/^[A-Za-z0-9]+$/).test(company)) {

    return false;
  }
}

var location=$('#loc').val();
if(location.length>0){
  if(!letterwithws.test(location)){

    return false;
  }
}
var start_date=$('#startdate').val();
var end_date=$('#enddate').val();
if((end_date)&(!startdate)){

  return false;
}
var position=$('#position').val();
if(position.length>0){
  if(!letterwithws.test(position)){

    return false;
  }
}
var sor=$('#sor').val();
if(sor.length>0){
  if(!letterwithws.test(sor)){

    return false;
  }
}
var achievements=$('#workexp_achievements').val();

var emp_state=$('#cur_emp_state').val();
var industry=$('#industry').val();

if(usertype=='1'){
var skills=$('#comm_skills').val();
var skills_to_learn=$('#comm_skills_learn').val();
var about_you=$('#about_you').val();
if(about_you.length>0)
{
  if(letterwithws.test(about_you))
  {

    return false;
  }
}
var pot_match=$('#pot_mat').val();


}else{
var vol_skills=$('#vol_skill').val();



var vol_roles=$('#vol_types').val();



}
var file=$("#resume_file").val();
if(file)
{
  var fileRegex = /([^s]+(?=.(pdf|txt)).2)/gm;
if(!fileRegex.test(resume_file)){
  alert("file type invalid");
  return false;
}
}


return true;
}
