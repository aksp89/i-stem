if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
var { isuserloggedin }= require("../models/test-model")
const express = require('express');
const {FileController} = require('../controllers/FileController');

class FileUploadRoutes{
constructor(){
  this.router = express.Router();
this.init();
}

init(){
  this.router.get('/math',isuserloggedin, new FileController().getFileUpload);
this.router.get('/video',isuserloggedin, new FileController().getVideo);

}

}//end of class

module.exports ={
  FileUploadRoutes
} ;
