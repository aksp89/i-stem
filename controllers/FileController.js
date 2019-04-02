
class FileController{
getIndex(req, res){
res.render('index');
}

getFileUpload(req, res){
        res.render('image');
}

getVideo(req, res){
        res.render('video');
}
}//end of class

module.exports = {
FileController
};