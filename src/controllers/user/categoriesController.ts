import { Request, Response } from "express";
import Category from "../../db/models/category";
import Product from "../../db/models/product";
import { HasMany, HasOne } from "sequelize";
import Product_category from "../../db/models/product_category";
import Review from "../../db/models/review";
import Seller from "../../db/models/seller";
import Product_image from "../../db/models/product_image";
import User from "../../db/models/user";

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

const getProductByCategory = async (req: Request, res: Response) => {
    try {
        const data = await Category.findOne({
            where: { name: req.params.category },
            include: {
                association: new HasMany(Category, Product_category, {
                    foreignKey: 'category_id',
                    as: 'product_categories'
                }),
                include: [
                    {
                        association: new HasOne(Product_category, Product, {
                            sourceKey: 'product_id',
                            foreignKey: 'id',
                            as: 'product'
                        }),
                        attributes: {
                            exclude: ['description']
                        },
                        include: [
                            {
                                association: new HasMany(Product, Product_image, {
                                    foreignKey: { name: 'product_id' },
                                    as: 'product_images'
                                }),
                                attributes: ['filename']
                            },
                            {
                                association: new HasOne(Product, Seller, {
                                    sourceKey: 'seller_id',
                                    foreignKey: 'id',
                                    as: 'seller'
                                }),
                                attributes: {
                                    exclude: ['id', 'password', 'createdAt', 'updatedAt']
                                }
                            },
                            {
                                association: 'categories',
                                attributes: {
                                    exclude: ['id', 'createdAt', 'updatedAt']
                                }
                            },
                            {
                                association: new HasMany(Product, Review, {
                                    foreignKey: { name: 'product_id' },
                                    as: 'reviews'
                                }),
                                include: [
                                    {
                                        association: new HasOne(Review, User, {
                                            as: 'user',
                                            foreignKey: 'id',
                                            sourceKey: 'user_id'
                                        }),
                                        attributes: {
                                            exclude: ['id', 'password']
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        });

        res.send({
            success: true,
            data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false
        });
    }
};

export {
    index,
    getProductByCategory
};