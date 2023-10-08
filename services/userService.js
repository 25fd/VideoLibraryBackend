const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const registerUser = async (username, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

   const hashedPassword = hashPassword(password);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();
};

const loginUser = async (email, password) => {

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User does not exist');
  }

 
  const hashedPassword = hashPassword(password);
  if (user.password !== hashedPassword) {
    throw new Error('Invalid email and password combination');
  }

 
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token, user };
};

module.exports = {
  registerUser,
  loginUser,
};
