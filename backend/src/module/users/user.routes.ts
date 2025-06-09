
import express from 'express';
import { UserController } from './user.controller';
import { authenticateToken } from '../../../utils/auth.middleware'; 

const router = express.Router();
const userController = new UserController();

// เส้นทางที่ไม่ต้อง  login


// router.get('/', userController.getAllUsers);      
// router.get('/:user_id', userController.getUserById); 

// กรณีบังคับ login
// router.post('/', authenticateToken, userController.createUser);



router.use(authenticateToken);

// เส้นทางที่ต้องล็อกอิน
router.get('/', userController.getAllUsers);      
router.get('/:user_id', userController.getUserById); 
router.post('/', userController.createUser);
router.put('/:user_id',userController.updateUser);
router.delete('/:user_id', userController.deleteUser);

export default router;

