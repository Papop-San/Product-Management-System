import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();
const authController = new AuthController();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logoutUser);

export default router;
