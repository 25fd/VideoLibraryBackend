const userService = require('../services/userService');

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await userService.registerUser(username, email, password);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await userService.loginUser(email, password);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
