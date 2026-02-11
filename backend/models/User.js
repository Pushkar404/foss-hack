const mongoose = require('mongoose');

const DEFAULT_CATEGORIES = [
  'Food',
  'Travel',
  'Bills',
  'Shopping',
  'Entertainment',
  'Health',
  'Other'
];

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    categories: {
      type: [String],
      default: DEFAULT_CATEGORIES
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false
  }
);

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
  DEFAULT_CATEGORIES
};

