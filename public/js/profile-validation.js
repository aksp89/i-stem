// Input fields
const firstName = document.getElementById('user_fname');
const lastName = document.getElementById('user_lname');
const mobile = document.getElementById('user_mob');
const postalcode = document.getElementById('post_code');
const email = document.getElementById('user_email');
const state = document.getElementById('state_location');
const form = document.getElementById('profileform');
const gender=$('input[name=gender]');
const communities=$('input[name=user_community]');
const usertype=$('input[name=user_Type]');

// Validation colors

const green = '#4CAF50';
const red = '#F44336';

// Handle form

function validate(){

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

  // Prevent default behaviour
  if (fileExtension() && validateUsertype() &&
      validateEmail() &&
      validateFirstName() &&
      validateLastName() &&
      validateMobNo() &&
      validateGender() &&
      validateCommunities() &&
      validateState() &&
      validatePostal() &&
      facebook_id() && twitter_id() && linkedin_id() && websites() && university() && uni_major() && uni_class() && yearofcompletion() && work_company() && work_location() && volunteerSkill() && volunteerTypes())
       {
      return true;

  }else {

    console.log("error");
    return false;
  }
}

// Validators
function validateGender(){

    if(isChecked(gender))
    {
      var message=""
      $('.gender-message').html(message);
      $(".gender-message").css("color","red");
      return true;
    }else{
      var message="gender is not checked";
      $('.gender-message').html(message);
    return false;
  }
}
function validateUsertype()
{
  if(isChecked(usertype))
  {
    var message=""
    $('.helper-usertype').html(message);
    $(".helper-usertype").css("color","red");
    return true;
  }else{
    var message="usertype is not checked";
    $('.helper-usertype').html(message);
  return false;
  }
}

function validateCommunities()
{
  if(isChecked(communities))
  {
    var message=""
    $('.helper-community').html(message);
    $(".helper-community").css("color","red");
    return true;
  }else{
    var message="gender is not checked";
    $('.helper-community').html(message);
  return false;
  }
}

function validateFirstName(){
  // check if is empty
  if (checkIfEmpty(firstName)) return;
  // is if it has only letters
  if (!containsCharacters(firstName, 6)) return;
  return true;
}
function validateLastName() {
  // check if is empty
  console.log("lname");
  if (checkIfEmpty(lastName)) return;
  // is if it has only letters
  if (!containsCharacters(lastName,6)) return;
  return true;
}

function validateMobNo(){
  // check if is empty
  if (checkIfEmpty(mobile)) return;
  if (!containsCharacters(mobile,13)) return;

  return true;
}

function validateState() {
  // check if is empty
  console.log("here");
  if(isEmpty(state.value)){
  var message=`${state} must not be empty`
  state.className="invalid";
  $(".state-message").html(message);
  return false;
  }else{
  state.className="valid"
  var message=" "
  $(".state-message").html(message);

  return true;
}
}
function validatePostal() {
  // check if is empty

  if (checkIfEmpty(postalcode)) return;
  // is if it has only letters
  if (!containsCharacters(postalcode,7)) return;
  return true;
}

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
// Utility functions
//
//initiatives
const trainings=document.getElementById('user_training');
const events=document.getElementById('user_event');



function training(){
  if(trainings.value.length>0){
    if (!containsCharacters(trainings,8)){
    return;
    }
    }
  return true;
}

function init_event(){
  if(events.value.length>0){
    if (!containsCharacters(events,8)){
    return;
    }
    }
  return true;
}

//profile
const facebook=document.getElementById('user_fb_id');
const twitter=document.getElementById('user_twit_id');
const linkedin=document.getElementById('lkn_id');
const website=document.getElementById('website');

function facebook_id()
{
  if(facebook.value.length>0){
  if (!containsCharacters(facebook,9)){
  return;
}
}
  return true;
}
function twitter_id()
{
  if(twitter.value.length>0){
  if (!containsCharacters(twitter,9)){
  return;
  }
  }
  return true;
}
function linkedin_id()
{
  if(linkedin.value.length>0){
  if (!containsCharacters(linkedin,9)){
  return;
  }
  }
  return true;
}
function websites()
{
  if(website.value.length>0){
  if (!containsCharacters(website,10)){
  return;
  }
  }
  return true;
}
//education
const universityname=document.getElementById('uni_name');
const major=document.getElementById('mjr');
const classes=document.getElementById('class');
const year_of_completion=document.getElementById('yoc');
const relevant_course=document.getElementById('user_edu_relevant_course');
const achievements=document.getElementById('user_edu_achievement');
const extra_curriculars=document.getElementById('user_edu_extracuract');

function university()
{
  if(universityname.value.length>0){
  if (!containsCharacters(universityname,11)){
  return;
  }
  }
  return true;
}

function uni_major()
{
if(major.value.length>0){
if (!containsCharacters(major,11)){
return;
}
}
return true;
}

function uni_class()
{
  if(classes.value.length>0){
  if (!containsCharacters(classes,11)){
  return;
  }
  }
  return true;
}

function yearofcompletion()
{
  if(year_of_completion.value.length>0){
  if (!containsCharacters(year_of_completion,7)){
  return;
  }
  }
  return true;
}

function relevant_courses()
{
  if(relevant_course.value.length>0){
  if (!containsCharacters(relevant_course,8)){
  return;
  }
  }
  return true;
}

function achievement()
{
  if(achievements.value.length>0){
  if (!containsCharacters(achievements,8)){
  return;
  }
  }
  return true;
}

function extracurr()
{
  if(extra_curriculars.value.length>0){
  if (!containsCharacters(extra_curriculars,11)){
  return;
  }
  }
  return true;
}
//work work_experience
const company=document.getElementById('cname');
const worklocation=document.getElementById('loc');
const start_date=document.getElementById('startdate');
const end_date=document.getElementById('enddate');
const position=document.getElementById('position');
const summary_responsibility=document.getElementById('sor');
const work_achievements=document.getElementById('workexp_achievements');

function work_company()
{
  if(company.value.length>0){
  if (!containsCharacters(company,12)){
  return;
  }
  }
  return true;
}

function work_location()
{
  if(worklocation.value.length>0){
  if (!containsCharacters(worklocation,11)){
  return;
  }
  }
  return true;
}

function work_start_date()
{
  //if (!containsCharacters(company,12)) return;
  return true;
}

function work_end_date()
{
  if((end_date.value!=" ")&(start_date.value==" ")){
    alert("hello")
    setInvalid(end_date,"end date without start date")
    return false;
  }
  return true;
}

function work_position()
{
  if(position.value.length>0){
  if (!containsCharacters(position,11)){
  return;
  }
  }
  return true;
}

function summary_of_responsibility()
{
  if(summary_responsibility.value.length>0){
  if (!containsCharacters(summary_responsibility,11)){
  return;
  }
  }
  return true;
}

function workAchievement()
{
  if(work_achievements.value.length>0){
  if (!containsCharacters(work_achievements,9)){
  return;
  }
  }
  return true;
}

//industry
const industry=document.getElementById('industry');
function industries()
{
  if(industry.value.length>0){
  if (!containsCharacters(industry,8)){
  return;
  }
  }
  return true;
}

//community
const community_skill=document.getElementById('comm_skills');
const skill_tolearn=document.getElementById('comm_skills_learn');
const about_you=document.getElementById('about_you');
const potential_match=document.getElementById('pot_mat');

function communitySkill()
{
  if(community_skill.value.length>0){
  if (!containsCharacters(community_skill,8)){
  return;
  }
  }
  return true;
}

function communitySkillToLearn()
{
  if(skill_tolearn.value.length>0){
  if (!containsCharacters(skill_tolearn,8)){
  return;
  }
  }
  return true;
}

function aboutYou()
{
  if(about_you.value.length>0){
  if (!containsCharacters(about_you,11)){
  return;
  }
  }
  return true;
}

function potentialMatch()
{
  if(potential_match.value.length>0){
  if (!containsCharacters(potential_match,8)){
  return;
  }
  }
  return true;
}

//volunteers
const skills=document.getElementById('vol_skill');
function volunteerSkill(){
  // check if is empty
  if(isEmpty(skill.value)){
  var message=`${skill} must not be empty`
  skill.className="invalid";
  $(".skills-type").html(message);
  return false;
  }else{
  skill.className="valid"
  var message=" "
  $(".skills-type").html(message);

  return true;
}
}

const types=$('input[name=vol_types]');
function volunteerTypes()
{
  if(isChecked(types))
  {
    setValid(types);
  return true;

  }else{
    setInvalid(types,"volunteer type should be checked");
    return false;
  }
}
/*
alert(file)
//  var fileRegex = /([^s]+(?=.(pdf|txt)).2)/gm;
var_types=[".pdf",".txt"];
var_types.forEach((value)=>{
if(file.endsWith(value))
{
  $(".helper-file").html("file invalid");
  return false;

}

})
$(".helper-file").html(" ");
return true;
*/
const file=document.getElementById("resume_file").value;
function fileExtension()
{
  var fileRegex = /([a-zA-Z0-9\s_\\.\-:])+(.doc|.docx|.pdf)$/;
  if(file.length>0)
  {

  if(!fileRegex.test(file)){
    $(".helper-file").html("file type invalid");
    return false;
  }

}
$(".helper-file").html("");
return true;
}





function isChecked(field){
  if(field.is(':checked')) return true;
  return false;
}
function checkIfEmpty(field) {
  if (isEmpty(field.value.trim())) {
    // set field invalid
    setInvalid(field, `${field.name} must not be empty`);
    return true;
  } else {
    // set field valid
    setValid(field);
    return false;
  }
}
function isEmpty(value){
  if (value === '') return true;
  return false;
}
function setInvalid(field, message) {
  //console.log(field);
  //console.log(field.nextElementSibling);
  field.className = 'invalid';
  field.nextElementSibling.innerHTML = message;
  field.nextElementSibling.style.color = red;
}
function setValid(field) {
  field.className = 'valid';
  field.nextElementSibling.innerHTML = '';
  field.nextElementSibling.style.color = green;
}

function checkIfOnlyLetters(field) {
  if (/^[a-zA-Z ]+$/.test(field.value)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, `${field.name} must contain only letters`);
    return false;
  }
}
function meetLength(field, minLength, maxLength) {
  if (field.value.length >= minLength && field.value.length < maxLength) {
    setValid(field);
    return true;
  } else if (field.value.length < minLength) {
    setInvalid(
      field,
      `${field.name} must be at least ${minLength} characters long`
    );
    return false;
  } else {
    setInvalid(
      field,
      `${field.name} must be shorter than ${maxLength} characters`
    );
    return false;
  }
}
function containsCharacters(field, code) {
  let regEx;
  switch (code) {
    case 1:
      // letters
      regEx = /(?=.*[a-zA-Z])/;
      return matchWithRegEx(regEx, field, 'Must contain at least one letter');
    case 2:
      // letter and numbers
      regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
      return matchWithRegEx(
        regEx,
        field,
        'Must contain at least one letter and one number'
      );
    case 3:
      // uppercase, lowercase and number
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
      return matchWithRegEx(
        regEx,
        field,
        'Must contain at least one uppercase, one lowercase letter and one number'
      );
    case 4:
      // uppercase, lowercase, number and special char
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
      return matchWithRegEx(
        regEx,
        field,
        'Must contain at least one uppercase, one lowercase letter, one number and one special character'
      );
    case 5:
      // Email pattern
      regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return matchWithRegEx(regEx, field, 'Must be a valid email address');
      case 6:
      //cehck only letter
      regEx=/^[a-zA-Z ]+$/;
      return matchWithRegEx(regEx,field,'Must contain only letter');
      case 7:
      //contains digit
      regEx=/^[0-9]+$/;
      return matchWithRegEx(regEx,field,'Must contain only digit');
      case 8:
      //for multiple inputs
      regEx=/^\w(\s*,?\s*\w)*$/;
      return matchWithRegEx(regEx,field,'Must contain only letters');
      case 9:
      regEx=/\b((http|https):\/\/?)[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/g;
      return matchWithRegEx(regEx,field,'Must contain valid url format');
      case 10:
      regEx=/[^w{3}.]([a-zA-Z0-9]([a-zA-Z0-9-]{0,65}[a-zA-Z0-9])?.)+[a-zA-Z]{2,6}/igm;
      return matchWithRegEx(regEx,field,'Must contain valid website format');
      case 11:
      //letter with space
      regEx=/^[A-Za-z\s]+$/;
      return matchWithRegEx(regEx,field,'Must contain valid letter ');
      case 12:
      //letter with numbers
      regEx=/^[A-Za-z0-9]+$/;
      return matchWithRegEx(regEx,field,'Must contain alphabet and numeric ');
      case 13:
      //letter with numbers
      regEx=/^\d{10}$/;
      return matchWithRegEx(regEx,field,'must be 10 digits ');

    default:
      return false;
  }
}
function matchWithRegEx(regEx, field, message) {
  if (field.value.match(regEx)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, message);
    return false;
  }
}
