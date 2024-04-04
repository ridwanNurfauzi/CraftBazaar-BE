import { Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import Product from "../../db/models/product";
import Product_image from "../../db/models/product_image";
import { BelongsTo, HasMany, HasOne } from "sequelize";
import Seller from "../../db/models/seller";
import Review from "../../db/models/review";
import User from "../../db/models/user";

const index = async (req: Request, res: Response) => {
    try {
        const data = await Product.findAll({
            attributes: {
                exclude: ['id', 'seller_id']
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
                        foreignKey: { name: 'id' },
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
        });

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

const getBySlug = async (req: Request, res: Response) => {
    try {
        const data = await Product.findOne({
            where: {
                slug: req.params.slug
            },
            attributes: {
                exclude: ['id', 'seller_id']
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
                        foreignKey: { name: 'id' },
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
                            as: 'user',
                            attributes: {
                                exclude: ['id', 'password']
                            }
                        }
                    ]
                }
            ]
        });

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
    index,
    getBySlug
};