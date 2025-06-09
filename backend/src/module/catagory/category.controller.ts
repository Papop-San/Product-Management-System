import { Request, Response } from 'express';
import { CategoryService } from './category.service';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.interface';

const categoryService = new CategoryService();

export class CategoryController {
  // GET /api/categories
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(200).json({ categories });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // GET /api/categories/:id
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const category = await categoryService.getCategoryById(id);
      res.status(200).json({ message: 'OK', data: category });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  // POST /api/categories
  async create(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateCategoryDTO[] = req.body;
      const created = await categoryService.createCategories(data);
      res.status(201).json({ message: 'Created', data: created });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // PUT /api/categories/:id
  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const data: UpdateCategoryDTO = req.body;
      const updated = await categoryService.updateCategory(id, data);
      res.status(200).json({ message: 'Updated', data: updated });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // DELETE /api/categories/:id
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await categoryService.deleteCategory(id);
      res.status(204).send(); // No Content
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
