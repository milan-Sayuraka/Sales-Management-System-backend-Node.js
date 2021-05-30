var cloudinary = require('cloudinary').v2;

exports.UploadImage = (req, res, next) => {
    const file = req.files.photo;
    if(file.size <= 512000) {
        cloudinary.uploader.upload(file.tempFilePath, function(error, result) {
            if (error) {
                res.status(500).send({ message: err.message });
                return;
              }
              res.send({ 
                  success: true,
                  URL: result.url
            });
        });
    } else {
        res.send({ 
            success: false,
            message: "File must be less than or equal 500 kb"
      });
    }

};