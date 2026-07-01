const multer = require('multer');
const path = require('path');

// require('../public/images/foodImages')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //cb(error,destination folder to store files)
        return cb(null, path.join(__dirname, '../public/images/foodImages'));
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error Images only (jpeg, jpg, png)");
    }
}

module.exports = upload;