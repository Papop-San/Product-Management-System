import { Request, Response } from 'express';
import { ProductService } from './product.service';
 
export class ProductController {
    private productService = new ProductService();

    createProduct = async (req: Request , res: Response) => {
        try{
            const result = await this.productService.createProducts(req.body);
            res.status(201).json(result);
        }catch(error:any) {
            res.status(400).json({error: error.message});
        }
    }

    getAllProduct = async (req: Request , res: Response) => {
        try{
            const result = await this.productService.getAllProducts();
            res.status(201).json(result);
        }catch (error: any){
            res.status(400).json({error: error.message});
        }
    }


    getProductByName = async (req: Request , res: Response) => {
        try{
            const result = await this.productService.getProductByName(req.body);
            res.status(201).json(result);
        }catch (error: any){
            res.status(400).json({error: error.message});
        }
    }
    

    getProductById = async (req: Request , res: Response) => {
        try{
            const product_id = parseInt(req.params.id_product);
            const result = await this.productService.getProductById(product_id);
            res.status(200).json(result)
        }catch (error: any){
            res.status(400).json({error: error.message})
        }
    }

    updateProduct = async (req: Request , res: Response) => {
        try{
            const product_id = parseInt(req.params.id_product);
            const result = await this.productService.updateProduct(product_id,req.body);
            res.status(201).json(result);
        }catch (error: any){
            res.status(400).json({error: error.message})
        }
    }

    deleteProduct  = async (req: Request , res: Response) => {
        try{
            const product_id = parseInt(req.params.id_product);
            const result = await this.productService.deleteProduct(product_id);
        }catch (error: any){
            res.status(400).json({error: error.message})
        }
    }
}