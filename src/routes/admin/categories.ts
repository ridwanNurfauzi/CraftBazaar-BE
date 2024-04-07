import { Router } from "express";
import * as categories from "../../controllers/admin/categoriesController";
import { verifyToken } from "../../middleware/admin/verify";

const router = Router();

router.get('/', verifyToken, categories.index);

router.get('/:id', verifyToken, categories.show);

router.post('/', verifyToken, categories.store);

router.put('/:id', verifyToken, categories.update);

router.delete('/:id', verifyToken, categories.destroy);


export default router;
