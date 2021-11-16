const multer = require('multer');

const MIME_TYPES = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination(req, file, callback) {
    const isValid = !!MIME_TYPES[file.mimetype];

    if (!isValid) {
      return callback(new Error('Invalid mime type'));
    }

    callback(null, 'images');
  },
  filename(req, file, callback) {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPES[file.mimetype];

    callback(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

module.exports = multer({ storage });
