const fileService = require('../services/fileService');

// File upload controller
exports.uploadFile = async (req, res) => {
  try {
    const { userId } = req;

    // Upload the file to S3 and save the file document
    const fileData = await fileService.uploadAndSaveFile(req.file, userId);

    res.status(200).json({ message: 'File uploaded successfully', file: fileData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// File delete controller
exports.deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    // Delete the file from S3 and remove the file document
    await fileService.deleteAndRemoveFile(fileId);

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// File share controller
exports.shareFile = async (req, res) => {
  try {
    const { email, read, write } = req.body;
    const { fileId } = req.params;

    console.log(req.body);
    // Share the file with the specified user
    await fileService.shareFileWithUser(fileId, email, read, write);

    res.status(200).json({ message: 'File shared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all files of the authenticated user
exports.getUserFiles = async (req, res) => {
  try {
    const userId = req.userId;

    // Get user files using the file service
    const userFiles = await fileService.getUserFiles(userId);

    res.status(200).json(userFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
