const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const fileController = require('../controllers/fileController');
const upload = require('../middlewares/uploadMiddleware');


router.post('/upload', authMiddleware.authenticateUser, upload.single('file'), fileController.uploadFile);

router.delete('/delete/:fileId', authMiddleware.authenticateUser, fileController.deleteFile);

router.post('/share/:fileId', authMiddleware.authenticateUser, fileController.shareFile);

router.get('/user-files', authMiddleware.authenticateUser, fileController.getUserFiles);

router.post('/upload-thumbnail/:fileId', authMiddleware.authenticateUser, upload.single('file'), fileController.uploadThumbnail);

router.put('/update/:fileId', authMiddleware.authenticateUser, fileController.updateFile);

module.exports = router;
