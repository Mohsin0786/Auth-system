const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.registerUser = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: generateToken(user._id),
      },
  });
  } catch (error) {
    next(error);
  }
};


exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
  
      res.status(200).json({
        message: 'User loggedIn successfully',
        user: {
          id: user._id,
          email: user.email,
          token: generateToken(user._id),
        }
      });

    } else {
      // Send error if authentication fails
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    // Pass the error to the next middleware (error handler)
    next(error);
  }
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    // Find the user by ID and exclude the password field
    const user = await User.findById(req.user.id).select('-password');

    // Check if the user was found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the user data
    res.json(user);
  } catch (error) {
    // Pass the error to the next middleware (error handler)
    next(error);
  }
};