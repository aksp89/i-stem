if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}
const az = require('../models/azure-storage-model');
const profile = require('../models/profile-model');
const
      express = require('express')
    , router = express.Router()
    , multer = require('multer')
    , inMemoryStorage = multer.memoryStorage()
    , uploadStrategy = multer({ storage: inMemoryStorage }).single('video')
    , getStream = require('into-stream')
    , containerName = 'videos'
;

const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService();
const video_indexer = require('../models/video-indexer-model');

const handleError = (err, res) => {
    res.status(500);
    res.render('error.hbs', { error: err });
};

const getBlobName = originalName => {
    const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
    return `${identifier}-${originalName}`;
};

router.post('/', uploadStrategy, (req, res) => {

    const
          blobName = getBlobName(req.file.originalname)
        , stream = getStream(req.file.buffer)
        , streamLength = req.file.buffer.length
    ;
profile.getUserInfo(token).then((user)=>{
console.log(user.data.login_mail);
    
    az.createContainer(containerName).then(()=>{
console.log('Container created');

    blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, err=>{
    if(err){
        handleError(err);
    return;
    }
    //get url of uploaded file    
    var fileUrl = blobService.getUrl(containerName, blobName);
    //call video indexer api
    video_indexer.getAccessToken(fileUrl, user.data.login_mail, containerName, blobName);
    res.render('success.hbs', { 
        message: 'File uploaded to Azure Blob storage',
        url: fileUrl,         
});
});//end of create from stream
}).catch((e)=>{
console.log('could not create container');
});
}).catch((e)=>{
    console.log('could not fetch user info');
    });
    
});//end of post

module.exports = router;