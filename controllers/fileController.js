const fileService = require('../services/fileService');

exports.uploadFile = async (req, res) => {
  try {
    const { userId } = req;
    const metadata = req.body;

    const fileData = await fileService.uploadAndSaveFile(req.file, metadata, userId);

    res.status(200).json({ message: 'File uploaded successfully', file: fileData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    await fileService.deleteAndRemoveFile(fileId);

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.shareFile = async (req, res) => {
  try {
    const { email, read, write } = req.body;
    const { fileId } = req.params;

    console.log(req.body);
    await fileService.shareFileWithUser(fileId, email, read, write);

    res.status(200).json({ message: 'File shared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserFiles = async (req, res) => {
  try {
    const userId = req.userId;

    const userFiles = await fileService.getUserFiles(userId);

    res.status(200).json(userFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.uploadThumbnail = async (req, res) => {
  try {
    const { fileId } = req.params;

    const fileData = await fileService.uploadAndSaveThumbnail(req.file, fileId);

    res.status(200).json({ message: 'Thumbnail uploaded successfully', file: fileData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.updateFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { title, description, isPublic, tags } = req.body;

    const fileData = await fileService.updateFile(fileId, title, description, isPublic, tags);

    res.status(200).json({ message: 'File updated successfully', file: fileData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}