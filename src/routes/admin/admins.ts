import { Router } from "express";
import * as admins from "../../controllers/admin/adminsController";
import { verifyToken } from "../../middleware/admin/verify";

const router = Router();

router.get('/', verifyToken, admins.index);

router.get('/:id', verifyToken, admins.show);

router.post('/', verifyToken, admins.store);

router.put('/:id', verifyToken, admins.update);

router.delete('/:id', verifyToken, admins.destroy);


export default router;
