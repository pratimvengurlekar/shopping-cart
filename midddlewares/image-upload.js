const multer = require('multer')
const uuid = require('uuid').v4
let upload = multer({
    storage: multer.diskStorage({
        destination: 'product-data/images',
        filename: function(req, file, cb){
            cb(null, uuid()+'-'+file.originalname)

        }
    })
})
let configuredMulterMiddleware = upload.single('image')
module.exports = configuredMulterMiddleware