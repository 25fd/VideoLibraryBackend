const mongoose = require('mongoose');

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
  }
});

module.exports = mongoose.model('File', fileSchema);
