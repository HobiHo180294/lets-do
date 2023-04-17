/* eslint-disable import/extensions */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import serverResponse from '../services/response.js';

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const isUsernameUsed = await User.findOne({ username });
    const isEmailUsed = await User.findOne({ email });

    if (isUsernameUsed) {
      return res.status(serverResponse.status.httpConflict).json({
        success: false,
        message: serverResponse.message.username.exists,
      });
    }

    if (isEmailUsed) {
      return res.status(serverResponse.status.httpConflict).json({
        success: false,
        message: serverResponse.message.email.exists,
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hash,
    });

    await newUser.save();

    return res.status(serverResponse.status.httpSuccess).json({
      newUser,
      success: true,
      message: serverResponse.message.registration.success,
    });
  } catch (error) {
    return res.status(serverResponse.status.httpBadRequest).json({
      success: false,
      error: error.message,
      message: serverResponse.message.registration.fail,
    });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(serverResponse.status.httpNotFound).json({
        success: false,
        message: serverResponse.message.user.notFound,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(serverResponse.status.httpUnauthorized).json({
        success: false,
        message: serverResponse.message.password.wrong,
      });
    }

    /* eslint-disable no-underscore-dangle */
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    /* eslint-disable no-underscore-dangle */

    return res.status(serverResponse.status.httpSuccess).json({
      token,
      user,
      success: true,
      message: serverResponse.message.login.success,
    });
  } catch (error) {
    return res.status(serverResponse.status.httpBadRequest).json({
      success: false,
      error: error.message,
      message: serverResponse.message.login.fail,
    });
  }
}

export async function getMe(req, res) {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(serverResponse.status.httpNotFound).json({
        message: serverResponse.message.user.notFound,
      });
    }

    /* eslint-disable no-underscore-dangle */
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    /* eslint-disable no-underscore-dangle */

    return res.status(serverResponse.status.httpSuccess).json({
      user,
      token,
      messaage: serverResponse.message.user.isFound,
    });
  } catch (error) {
    return res.status(serverResponse.status.httpNoAccess).json({
      error: error.message,
      message: serverResponse.message.login.noAccess,
    });
  }
}
