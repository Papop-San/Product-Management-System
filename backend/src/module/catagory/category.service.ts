import { PrismaClient, Category } from '@prisma/client';
import {
  CategoryResponseDTO,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from './category.interface';


const prisma = new PrismaClient();

export class CategoryService {
  async createCategories(dataArray: CreateCategoryDTO[]): Promise<Category[]> {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      throw new Error('Input must be a non-empty array of categories');
    }

    const createdCategories: Category[] = [];

    for (const data of dataArray) {
      if (!data.name) {
        throw new Error('Missing required field: name');
      }
      // Check Unique parent Id
      if (data.parent_id) {
        const parentExists = await prisma.category.findUnique({
          where: { id_category: data.parent_id },
        });
        if (!parentExists) {
          throw new Error(`Parent category with id ${data.parent_id} does not exist`);
        }
      }
    
      const createdCategory = await prisma.category.create({
        data: {
          name: data.name,
          parent_id: data.parent_id ?? null,
        },
      });

      createdCategories.push(createdCategory);
    }

    return createdCategories;
  }

  async getAllCategories(): Promise<CategoryResponseDTO[]> {
    const categories = await prisma.category.findMany({
      include: {
        children: true,
        parent: true,
        products: true,
      },
    });

    return categories.map((cat) => ({
      id_category: cat.id_category,
      name: cat.name,
      parent_id: cat.parent_id,
      parent_name: cat.parent?.name || null,
      children: cat.children.map((child) => ({
        id_category: child.id_category,
        name: child.name,
      })),
      created_at: cat.created_at,
      product_count: cat.products.length,
    }));
  }

  async getCategoryById(id: number): Promise<CategoryResponseDTO> {
    const cat = await prisma.category.findUnique({
      where: { id_category: id },
      include: {
        children: true,
        parent: true,
        products: true,
      },
    });

    if (!cat) throw new Error(`Category with id ${id} not found`);

    return {
      id_category: cat.id_category,
      name: cat.name,
      parent_id: cat.parent_id,
      parent_name: cat.parent?.name || null,
      children: cat.children.map((child) => ({
        id_category: child.id_category,
        name: child.name,
      })),
      created_at: cat.created_at,
      product_count: cat.products.length,
    };
  }

  async updateCategory(id: number, data: UpdateCategoryDTO): Promise<Category> {
    const exists = await prisma.category.findUnique({
      where: { id_category: id },
    });
    if (!exists) throw new Error(`Category with id ${id} not found`);

    if (data.parent_id) {
      if (data.parent_id === id) {
        throw new Error(`A category cannot be its own parent`);
      }
      const parentExists = await prisma.category.findUnique({
        where: { id_category: data.parent_id },
      });
      if (!parentExists) {
        throw new Error(`Parent category with id ${data.parent_id} not found`);
      }
    }

    return prisma.category.update({
      where: { id_category: id },
      data: {
        name: data.name,
        parent_id: data.parent_id ?? null,
      },
    });
  }

  async deleteCategory(id: number): Promise<void> {
    const exists = await prisma.category.findUnique({
      where: { id_category: id },
    });
    if (!exists) throw new Error(`Category with id ${id} not found`);

    await prisma.category.delete({
      where: { id_category: id },
    });
  }
}
