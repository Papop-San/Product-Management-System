import { Router } from 'express';
import { CategoryController } from './category.controller';
import { authenticateToken } from '../../../utils/auth.middleware';

const router = Router();
const controller = new CategoryController();

router.use(authenticateToken)

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
