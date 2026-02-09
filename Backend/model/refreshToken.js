const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    token: {
      type: String,
      required: true,
      index: true
    },

    ipAddress: {
      type: String,
      required: true
    },

    deviceType: {
      type: String,
      enum: ['web', 'mobile', 'tablet', 'desktop', 'unknown'],
      default: 'unknown'
    },

    userAgent: {
      type: String
    },

    createdAt: {
      type: Date,
      default: Date.now,
      expires: '30d' // ⏱️ TTL: auto delete after 30 days
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);
