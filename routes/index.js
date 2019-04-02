if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const express = require('express');
const {FileController} = require('../controllers/FileController');
 
class FileUploadRoutes{
constructor(){
  this.router = express.Router();
this.init();
}

init(){
this.router.get('/', new FileController().getIndex);
  this.router.get('/math', new FileController().getFileUpload);
this.router.get('/video', new FileController().getVideo);
}

}//end of class

module.exports ={
  FileUploadRoutes
} ;