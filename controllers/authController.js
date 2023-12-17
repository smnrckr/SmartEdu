import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // USER SESSION
        return res.status(200).send('YOU ARE LOGGED IN');
      }
    }

    res.status(401).send('Invalid email or password');
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error,
    });
  }
};
