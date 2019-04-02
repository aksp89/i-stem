var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);

//account information
const location = 'trial';
const account_id = 'dcc84652-aec5-4565-8068-bb2fbe3abe94';
const Subscription_key = '6eaa6eac5cf947748e567162ad07628e';
//function to get video access token
function getAccessToken(fileUrl){
    console.log('Video URL: ' + fileUrl);
    var params = {"allowEdit": "true", };
  
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://api.videoindexer.ai/auth/" + location + "/Accounts/" + account_id + "/AccessToken?" + $.param(params),
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", Subscription_key);
        },
        type: "GET",
        data: {}
    }).done(function(data) {
        console.log('Access Token: ' + data);
uploadVideo(data, fileUrl);
}).fail(function() {
    console.log('access token error');
  });    
}//end of getAccessToken

//function to upload video 
function uploadVideo(data, fileUrl){
    console.log('Video URL Received' + fileUrl);
    var params = {videoUrl: fileUrl, streamingPreset: "Default", privacy: "Public",};
      
      $.ajax({
        url: "https://api.videoindexer.ai/trial/Accounts/dcc84652-aec5-4565-8068-bb2fbe3abe94/Videos?accessToken=" + data + "&name=venom&" + $.param(params),
        beforeSend: function(xhrObj) {
          xhrObj.setRequestHeader("Content-Type", "multipart/form-data");
        },
        type: "POST",
        data: "{body}",
      }).done(function(data) {
        console.log('upload successful');
          console.log(data);
        var video_id = data.id;
        console.log('video id: ' + video_id);
    getCaptions(video_id);    
    }).fail( function(){
            console.log('Upload failed');
        });
    }//end of uploadVideo
    
    //function to get video transcript
    function getCaptions(video){
        var video_id = video;
        console.log('My Video Id:' + video_id);
        var params = {"accessToken": "", "language": "English",};
        
        $.ajax({
            url: "https://api.videoindexer.ai/trial/Accounts/dcc84652-aec5-4565-8068-bb2fbe3abe94/Videos/" + video_id + "/Index?" + $.param(params),
            beforeSend: function(xhrObj){
            },
            type: "GET",
            data: "{body}",
        }).done(function(data) {
var transcript = ''; 
if(data.state != 'Processed'){
  setTimeout(getCaptions, 60000, video_id);
}else{
    console.log('Video processed');
    //get transcript
    for(var i = 0; i < data.videos[0].insights.transcript.length; i++){
        transcript +=data.videos[0].insights.transcript[i].text; 
        }        
        console.log(transcript);
}
//call email function    
    }).fail(function() {
        console.log('captions error');
        });
    }//end of getCaptions

function deleteVideo(video){

}
    module.exports = {
getAccessToken, uploadVideo, getCaptions, deleteVideo
};  
