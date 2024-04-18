import { Request, Response, Router } from "express";
import userRoutes from './user';
import sellerRoutes from './seller';
import adminRoutes from './admin';

import expressListEndpoints from "express-list-endpoints";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    return res.send({
        success: true
    });
});

router.use('/user', userRoutes);
router.use('/seller', sellerRoutes);
router.use('/admin', adminRoutes);

router.all((expressListEndpoints(router).map(e => e.path)), (req: Request, res: Response) => {
    res.status(405).send({
        success: false,
        status: res.statusCode
    });
});

router.use((req: Request, res: Response) => {
    res.status(404).send({
        success: false,
        status: res.statusCode
    });
});

export default router;
