// controllers/cart.controller.ts
import { Request, Response } from 'express';
import { CartService } from './cart.service';

const cartService = new CartService();

export class CartController {
   async addItemToCart(req: Request, res: Response) {
    try {
      const { userId, productId, quantity } = req.body;
      await cartService.addItemCart({ userId, productId, quantity });
      res.status(200).json({ message: 'Item added to cart' });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Server Error' });
    }
  }

  async getCartItems(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const items = await cartService.getCartItems(userId);
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Server Error' });
    }
  }

  async removeItemFromCart(req: Request, res: Response) {
    try {
      const { userId, productId } = req.body;
      await cartService.removeItemFromCart( userId, productId );
      res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Server Error' });
    }
  }

  async clearCart(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      await cartService.clearCart(userId);
      res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Server Error' });
    }
  }
}
