
class FileController{
getIndex(req, res){
res.render('index');
}

getFileUpload(req, res){
        res.render('image.hbs');
}

getVideo(req, res){
        res.render('video.hbs');
}
}//end of class

module.exports = {
FileController
};
