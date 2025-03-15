const User = require('../model/user');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  try {
    if (!userName || !userEmail || !userPassword) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ userEmail });

    if (existingUser) {
      return res.status(400).json({ message: 'User email already exists!' });
    } else {
      const hashedPassword = await bcrypt.hash(userPassword, 10);
      const user = new User({ userName, userEmail, userPassword: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'User signup successfully' });
    }
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = signup;