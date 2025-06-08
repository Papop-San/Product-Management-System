import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
const userController = new UserController();

router.get('/', userController.getAllUsers);
router.get('/:user_id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:user_id', userController.updateUser);
router.delete('/:user_id', userController.deleteUser);

export default router;