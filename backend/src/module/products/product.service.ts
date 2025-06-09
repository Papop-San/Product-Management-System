import { PrismaClient, Product } from '@prisma/client';
import { CreateProductDTO } from './product.interface';

const prisma = new PrismaClient();

export class ProductService {
    async createProducts(dataArray: CreateProductDTO[]): Promise<Product[]> {
        // ตรวจสอบ input เบื้องต้น (ถ้าจำเป็น)
        if (!Array.isArray(dataArray) || dataArray.length === 0) {
            throw new Error('Input must be a non-empty array of products');
        }

        //หากเงื่อนตัวใด null throw error ออกมาทันที
        const formattedData = dataArray.map(item => {
            if (!item.name || !item.price || !item.sku || !item.id_category) {
                throw new Error('Missing required fields: name, price, sku, or id_category');
            }

            return {
                ...item,
                id_category: typeof item.id_category === 'string' ? parseInt(item.id_category) : item.id_category,
            };
        });

        try {
            // ใช้ Promise.all เพื่อสร้างสินค้าแต่ละชิ้นพร้อมกัน
            const createdProducts = await Promise.all(
                formattedData.map(productData =>
                    prisma.product.create({
                        data: {
                            name: productData.name,
                            description: productData.description,
                            price: productData.price,
                            discount_price: productData.discount_price,
                            sku: productData.sku,
                            status: productData.status,
                            brand_id: productData.brand_id,
                            stock_quantity: productData.stock_quantity,
                            weight_gram: productData.weight_gram,
                            star: productData.star,
                            image_url: productData.image_url,
                            id_category: productData.id_category,
                        },
                    })
                )
            );

            return createdProducts;
        } catch (error) {
            console.error('Failed to create products:', error);
            throw new Error('Failed to create products');
        }
    }

    async getProductByName(name: string): Promise<Product | null> {
        return await prisma.product.findFirst({
          where: {
            name: {
              contains: name, 
              mode: 'insensitive',
            },
          },
        });
      }
    async getAllProducts(): Promise<Product[]> {
        return await prisma.product.findMany();
    }

    async getProductById(id_product: number): Promise<Product | null> {
        return await prisma.product.findUnique({ where: { id_product } });
    }

    async updateProduct(id_product: number, data: Partial<Omit<Product, 'id_product' | 'created_at' | 'updated_at'>>): Promise<Product | null> {
        const updatedProduct = await prisma.product.update({
            where: { id_product },
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                discount_price: data.discount_price,
                stock_quantity: data.stock_quantity,
                weight_gram: data.weight_gram,
                status: data.status,
                id_category: typeof data.id_category === 'string'
                    ? parseInt(data.id_category)
                    : data.id_category,
                updated_at: new Date(),
            },
        });
        return updatedProduct;
    }

    async deleteProduct(id_product: number): Promise<void> {
        await prisma.product.delete({ where: { id_product } });
    }
}
