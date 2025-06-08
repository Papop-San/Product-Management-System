import express from 'express';
import { UserController } from './user.controller';
import { authenticateToken } from '../../../utils/auth.middleware'; 

const router = express.Router();
const userController = new UserController();

// เส้นทางที่ไม่ต้องล็อกอิน
router.get('/', userController.getAllUsers);      // ไม่ต้องล็อกอิน
router.get('/:user_id', userController.getUserById);  // ไม่ต้องล็อกอิน

// เส้นทางที่ต้องล็อกอิน
router.post('/', authenticateToken, userController.createUser);
router.put('/:user_id', authenticateToken, userController.updateUser);
router.delete('/:user_id', authenticateToken, userController.deleteUser);

export default router;
