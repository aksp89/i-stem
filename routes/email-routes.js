const express = require('express');
const email_controller = require('../controllers/email-controller');

class EmailRoutes{
    constructor(){
        this.router = express.Router();
        this.init();
    }
init(){
    this.router.get('/interested/:volunteer_id/:user_id', email_controller.sendVolunteerDetails);
this.router.get('/confirm/:volunteer_id/:user_id', email_controller.sendUserDetails);
}
}//end of class

module.exports = {
EmailRoutes
};