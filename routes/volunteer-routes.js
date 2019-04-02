const express = require('express');
const volunteersController = require('../controllers/volunteers');

class VolunteerRoutes{
    constructor(){
this.router = express.Router();
this.init();    
}

init(){
this.router.get('/volunteers', volunteersController.getVolunteers);
this.router.post('/findVolunteers', volunteersController.findVolunteers);
}//end of init

}//end of class

module.exports = {
VolunteerRoutes
};