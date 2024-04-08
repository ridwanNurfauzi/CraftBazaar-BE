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
                exclude: ['id', 'description']
            },
            include: [
                {
                    association: new HasMany(Product, Product_image, {
                        foreignKey: 'product_id',
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


const latest = async (req: Request, res: Response) => {
    try {
        const response = await Product.findAll({
            attributes: {
                exclude: ['id', 'description']
            },
            include: [
                {
                    association: new HasMany(Product, Product_image, {
                        foreignKey: 'product_id',
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
        });

        const data = response.sort((a, b) => new Date(a.createdAt ?? '').getTime() - new Date(b.createdAt ?? '').getTime()).reverse();

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

const earliest = async (req: Request, res: Response) => {
    try {
        const response = await Product.findAll({
            attributes: {
                exclude: ['id', 'description']
            },
            include: [
                {
                    association: new HasMany(Product, Product_image, {
                        foreignKey: 'product_id',
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
        });

        const data = response.sort((a, b) => new Date(a.createdAt ?? '').getTime() - new Date(b.createdAt ?? '').getTime());

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

const popular = async (req: Request, res: Response) => {
    try {
        const response = await Product.findAll({
            attributes: {
                exclude: ['id', 'description']
            },
            include: [
                {
                    association: new HasMany(Product, Product_image, {
                        foreignKey: 'product_id',
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
        });

        const data = response.sort((a, b) => a.sold - b.sold).reverse();

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
        const response = await Product.findOne({
            where: {
                slug: req.params.slug
            },
            attributes: {
                exclude: ['seller_id']
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
                            as: 'user',
                            attributes: {
                                exclude: ['password']
                            }
                        }
                    ]
                }
            ]
        });

        let data: any = response?.toJSON();

        data.reviews = data?.reviews.reverse();
        if (res.locals.user) {
            data.personal_reviews = data.reviews.filter((e: any) =>
                e.user.id == res.locals.user.id
            );
            data.showed_reviews = data.reviews.filter((e: any) =>
                e.user.id != res.locals.user.id
            );
        }
        else
            data.showed_reviews = data.reviews;

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

const removePersonalReview = async (req: Request, res: Response) => {
    try {
        const user = res.locals.user;
        const data = await Review.destroy({
            where:{
                id: req.params.id ?? 0,
                user_id: user.id ?? 0
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

const addReview = async (req: Request, res: Response) => {
    try {
        const user = res.locals.user;
        const data = await Review.create({
            rating: req.body?.rating ?? 0,
            text: req.body?.text ?? '',
            product_id: req.body?.product_id ?? 0,
            user_id: user.id ?? 0
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
    latest,
    earliest,
    popular,
    getBySlug,
    removePersonalReview,
    addReview
};