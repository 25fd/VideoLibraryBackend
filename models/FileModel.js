const mongoose = require('mongoose');
const s3Service = require('../services/s3Service');

const UserPermissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  write: { type: Boolean, default: false },
  read: { type: Boolean, default: false },
});

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  permissions: [UserPermissionSchema],
  url: {
    type: String, 
    required: true
  },
  thumbnailKey: {
    type: String,
    default: ''
  },
  thumbnailUrl: {
    type: String,
    default: ''
  },
  fileKey: {
    type: String,
    required: true 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isPublic: {
    type: Boolean,
    default: false  
  },
  tags: [{ type: String }],
});

fileSchema.post('find', async function (file) {
  if (!file) {
    return;
  }

  if (Array.isArray(file)) {
    for (let i = 0; i < file.length; i++) {
      if (file[i].thumbnailKey) {
        file[i].thumbnailUrl = await s3Service.getSignedUrl(file[i].thumbnailKey);
      }
      file[i].url = await s3Service.getSignedUrl(file[i].fileKey);
    }
  } else {
    if (file.thumbnailKey) {
      file.thumbnailUrl = await s3Service.getSignedUrl(file.thumbnailKey);
    }
    file.url = await s3Service.getSignedUrl(file.fileKey);
  }
});

module.exports = mongoose.model('File', fileSchema);
