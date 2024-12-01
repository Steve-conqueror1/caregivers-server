import { Router } from 'express';
import {
  register,
  login,
  authenticatedUser,
  refresh,
  logout,
  forgot,
} from '../controllers/auth.controller';

const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/user', authenticatedUser);
router.get('/auth/refreshToken', refresh);
router.get('/auth/logout', logout);
router.get('/auth/forgot', forgot);

export default router;
