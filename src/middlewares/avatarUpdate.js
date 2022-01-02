const multer = require('multer')
const path = require('path')

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/img/avatar')
    },
    filename: (req, file, cb) =>{
        cb(null, "ava__" + Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = function(req, file,callback) {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        req.fileValidationError = "Sólo imágenes (.jpg, .jpeg, .png, .gif)";
        return callback(null,false,req.fileValidationError);
    }
    callback(null,true);
}


let upload = multer({storage: storage , fileFilter})

module.exports = upload