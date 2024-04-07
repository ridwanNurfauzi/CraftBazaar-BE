import { Request, Response } from "express";
import Admin from "../../db/models/admin";
import { checkSchema, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import Category from "../../db/models/category";
import { HasMany, HasOne } from "sequelize";
import Product_category from "../../db/models/product_category";
import Product from "../../db/models/product";
import Product_image from "../../db/models/product_image";
import Seller from "../../db/models/seller";
import Review from "../../db/models/review";
import User from "../../db/models/user";

const index = async (req: Request, res: Response) => {
    try {
        const data = await Category.findAll({
            include: [
                {
                    association: new HasMany(Category, Product_category, {
                        foreignKey: 'product_id',
                        sourceKey: 'id'
                    })
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

const store = async (req: Request, res: Response) => {
    try {
        const categories = await Category.findAll({
            where: { name: req.body.name ?? '' }
        });

        await checkSchema({
            name: {
                notEmpty: { errorMessage: "Nama tidak boleh kosong." },
                custom: {
                    options: (async e => {
                        if (categories.length > 0)
                            throw new Error('Nama kategori yang anda masukkan sudah ada.');
                    })
                }
            },
        }).run(req);
        const vResult = validationResult(req);

        if (!vResult.isEmpty()) {
            return res.send({
                success: false,
                vError: !vResult.isEmpty(),
                vResult: vResult
            });
        }
        else {
            let values: any = {
                name: req.body.name,
            };

            const response = await Category.create(values);

            return res.status(201).send({
                success: true,
                values,
                response
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false
        });
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const data = await Category.findOne({
            where: { id: req.params.id },
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
            data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false
        });
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        let values: any = {
            name: req.body.name
        };

        await checkSchema({
            name: {
                notEmpty: { errorMessage: "Nama tidak boleh kosong." },
            },
        }).run(req);
        const vResult = validationResult(req);

        if (!vResult.isEmpty()) {
            return res.send({
                success: false,
                vError: !vResult.isEmpty(),
                vResult: vResult
            });
        }
        else {
            const t = await Category.update(values, { where: { id } });

            res.send({
                success: true,
                values,
                t
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false
        });
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const t = await Category.destroy({
            where: { id }
        });

        res.send({
            success: true,
            t
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
    store,
    show,
    update,
    destroy
};