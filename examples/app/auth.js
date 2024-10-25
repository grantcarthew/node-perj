import logModule from './logger.js';
import { fileURLToPath } from 'url';

// Convert import.meta.url to a file path
const modulePath = fileURLToPath(import.meta.url);
const log = logModule.child(modulePath);

/**
 * Middleware function to check if the user is authenticated.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export default function (req, res, next) {
  // Check user is authenticated here.
  log.info('user authenticated');
  next();
}
