/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import serverResponse from '../services/response.js';

export default function checkAuth(req, res, next) {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;

      next();

      return null;
    } catch (error) {
      return res.status(serverResponse.status.httpNoAccess).json({
        error: error.message,
        message: serverResponse.message.login.noAccess,
      });
    }
  } else {
    return res.status(serverResponse.status.httpNoAccess).json({
      message: serverResponse.message.login.noAccess,
    });
  }
}
