if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}
const math_pix = require('../models/math-pix-model');
const profile = require('../models/profile-model');
const az = require('../models/azure-storage-model');
const idtoken =require('../controllers/authentication/password-authentication');
const
      express = require('express')
    , router = express.Router()
    , multer = require('multer')
    , inMemoryStorage = multer.memoryStorage()
    , uploadStrategy = multer({ storage: inMemoryStorage }).single('image')
    , azureStorage = require('azure-storage')
    , blobService = azureStorage.createBlobService()
    , getStream = require('into-stream')
    , containerName = 'images'
;

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
	console.log(token);
    profile.getUserInfo(token).then((user)=>{
        console.log('User Email: ' + user.data.login_mail);
                        //create container and upload image to azure storage
                        az.createContainer(containerName).then(()=>{
                            console.log('Container created');

                        blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, err => {

        if(err) {
            handleError(err);
            return;
        }

        var fileUrl =blobService.getUrl(containerName, blobName);
    console.log('File URL: ' + fileUrl);
    math_pix.getMath(fileUrl, user.data.login_mail, containerName, blobName);

    res.render('success.hbs', {
        message: 'File uploaded to Azure Blob storage',
        url: fileUrl,
    });

});
}).catch((e)=>{
    console.log('could not create container');
});

}).catch((e)=>{
	console.log(e);
    console.log('Could not fetch user info');
        });

});


module.exports = router;
