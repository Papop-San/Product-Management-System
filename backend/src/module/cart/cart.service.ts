import { PrismaClient, Cart } from '@prisma/client';
import { AddItemToCartDTO, CartItemResponseDTO } from './cart.interface';

const prisma = new PrismaClient();

export class CartService {
    async addItemCart(data: AddItemToCartDTO): Promise<void> {
        let cart = await prisma.cart.findFirst({ where: { user_id: data.userId } });
        // สร้างตะกร้าใหม่ถ้าไม่มีอยู่:
        if (!cart) {
            cart = await prisma.cart.create({ data: { user_id: data.userId } });
        }
        // ตรวจสอบว่ามีสินค้านี้ในตะกร้าแล้วหรือยัง
        const existingItem = await prisma.itemCart.findFirst({
            where: { id_cart: cart.id_cart, product_id: data.productId },
        });
        // ถ้ามีสินค้าในตะกร้าแล้ว ให้เพิ่มจำนวนสินค้า
        if (existingItem) {
            await prisma.itemCart.update({
                where: { id_itemcart: existingItem.id_itemcart },
                data: { quantity: existingItem.quantity + data.quantity },
            });
        } else {
            await prisma.itemCart.create({
                data: {
                    id_cart: cart.id_cart,
                    product_id: data.productId,
                    quantity: data.quantity,
                },
            });
        }
    }
    async getCartItems(userId: number): Promise<CartItemResponseDTO[]> {
        const cart = await prisma.cart.findFirst({ where: { user_id: userId } });
        if (!cart) return [];
        const items = await prisma.itemCart.findMany({
          where: { id_cart: cart.id_cart },
          include: { product: true },
        });
        return items.map(item => ({
          id_itemcart: item.id_itemcart,
          product_id: item.product_id,
          product_name: item.product.name ?? '',
          quantity: item.quantity,
          price: item.product.price ?? 0, 
          image_url: item.product.image_url || undefined,
        }));
      }
    
      async removeItemFromCart(userId: number, productId: number): Promise<void> {
        const cart = await prisma.cart.findFirst({ where: { user_id: userId } });
        if (!cart) throw new Error('Cart not found');
      
        await prisma.itemCart.deleteMany({
          where: {
            id_cart: cart.id_cart,
            product_id: productId,
          },
        });
      }

      async clearCart(userId: number): Promise<void> {
        const cart = await prisma.cart.findFirst({ where: { user_id: userId } });
        if (cart) {
          await prisma.itemCart.deleteMany({ where: { id_cart: cart.id_cart } });
        }
      }
      
}