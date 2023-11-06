const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});


const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /mp4|png/; 
  const ext = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedFileTypes.test(file.mimetype);
  console.log(ext, mimeType);
  if (ext && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Only videos are allowed'));
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const upload = multer({
  storage,
  fileFilter,
  limits,
});

module.exports = upload;
