const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods.generateToken = async function () {
  const token = jwt.sign(
    { email: this.email, _id: this._id },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );

  this.token = token;
  await this.save();

  return { token, expiresIn: 3600 };
};

module.exports = mongoose.model('User', userSchema);
