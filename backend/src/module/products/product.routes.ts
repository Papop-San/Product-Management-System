import express from 'express';
import { ProductController } from './product.controller';
import { authenticateToken } from '../../../utils/auth.middleware';

const router = express.Router();
const productController = new ProductController();

router.get("/", productController.getAllProduct);
router.get("/:name", productController.getProductByName);

router.get('/:id_product', productController.getProductById);   
router.post('/', productController.createProduct);
router.put('/:id_product', productController.updateProduct) ;
router.delete('/:id_product' , productController.deleteProduct) 

export default router;
