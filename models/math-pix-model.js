if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);
const img_url = require('imageurl-base64');
const mail = require('./mail-model');
const az = require('./azure-storage-model');

const app_id = process.env.app_id;
    const app_key =process.env.app_key;

function getMath(fileUrl, user_email, containerName, blobName){
    console.log('starting getMath');
    console.log(user_email);
    var fileUri ="data:image/jpg;base64,";
    //convert image url into base64
      img_url(fileUrl, function(err, data){
        console.log('encoding...');
        if(data){
fileUri += data.base64;

//call math pix api
$.ajaxSetup({
headers: {'Content-Type': 'application/json', 'app_id': app_id, 'app_key': app_key}
})            ;

$.ajax({
                url: "https://api.mathpix.com/v3/latex",
                type: "POST",
                data: '{"src": "' + fileUri + '"}',
            }).done(function(data) {

                console.log('Math pix success');
                console.log(data.latex.length);
                console.log(data.latex);
            //call email function
if(data.latex.length > 0){
    var attachments = [{filename: 'MathImageTranscript.txt', content: data.latex}];
    mail.sendEmail(user_email, 'Math Image Text', 'transcript', {message: "Please find the transcript for your math image attached below."}, attachments);
}else{
mail.sendEmail(user_email, 'Math Image Error', 'transcript', {transcript: '', message: "Sorry we could not generate transcript for your image. Our program works best with printed and well zoomed math images. We are currently not able to process handwritten math content."});
}
//delete uploaded file
az.deleteBlob(containerName, blobName);
}).fail(function() {
            console.log('Math pix error');
            mail.sendEmail(user_email, 'Math Image Error', 'transcript', {transcript: '', message: "Sorry we could not generate transcript for your image. Our program works best with printed and well zoomed math images. We are currently not able to process handwritten math content."});
az.deleteBlob(containerName, blobName);
        });

        }else{
                console.log('error encoding');
            mail.sendEmail(user_email, 'Math Image Error', 'transcript',{message: "Sorry we could not process your image due to technical difficulties. Please try again later."});
        az.deleteBlob(containerName, blobName);
        }
            });

}//end of getMath

module.exports = {
getMath
};
