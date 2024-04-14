import { Request, Response } from "express";
import Category from "../../db/models/category";

const index = async (req: Request, res: Response) => {
    try {
        const data = await Category.findAll();

        res.send({
            success: true,
            data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false
        });
    }
};

export {
    index
};