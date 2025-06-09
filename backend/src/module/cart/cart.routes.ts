import express from 'express';
import { CartController } from './cart.controller';
import { authenticateToken } from '../../../utils/auth.middleware';

const router = express.Router();
const cartController = new CartController();

router.use(authenticateToken)

router.post('/add', cartController.addItemToCart);
router.get('/:userId', cartController.getCartItems);
router.delete('/remove', cartController.removeItemFromCart);
router.delete('/clear/:userId', cartController.clearCart);


export default router;
