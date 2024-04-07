import { Request, Response } from "express";
import Product from "../../db/models/product";
import Product_image from "../../db/models/product_image";
import { HasMany, HasOne } from "sequelize";
import Seller from "../../db/models/seller";
import Review from "../../db/models/review";
import User from "../../db/models/user";
import Subscription from "../../db/models/subscription";

const index = async (req: Request, res: Response) => {
    try {
        const data = await Seller.findAll({
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    association: new HasMany(Seller, Product, {
                        foreignKey: 'seller_id',
                        as: 'products'
                    }),
                    attributes: ['slug']
                },
                {
                    association: new HasMany(Seller, Subscription, {
                        foreignKey: 'seller_id',
                        as: 'subscriptions'
                    }),
                    include: [
                        {
                            association: new HasOne(Subscription, User, {
                                sourceKey: 'subscriber_id',
                                foreignKey: 'id',
                                as: 'user'
                            }),
                            attributes: {
                                exclude: ['password']
                            }
                        }
                    ]
                }
            ]
        });

        data.reverse();

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

const show = async (req: Request, res: Response) => {
    try {
        let success = true;
        const code = req.params.code;
        const response = await Seller.findOne({
            where: { code },
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    association: new HasMany(Seller, Product, {
                        foreignKey: 'seller_id',
                        as: 'products'
                    }),
                    attributes: ['slug']
                },
                {
                    association: new HasMany(Seller, Subscription, {
                        foreignKey: 'seller_id',
                        as: 'subscriptions'
                    }),
                    include: [
                        {
                            association: new HasOne(Subscription, User, {
                                sourceKey: 'subscriber_id',
                                foreignKey: 'id',
                                as: 'user'
                            }),
                            attributes: {
                                exclude: ['password']
                            }
                        }
                    ]
                }
            ]
        });

        let data: any = response?.toJSON();

        if (!!data && !!data?.id) {
            const products = await Product.findAll({
                attributes: {
                    exclude: ['id', 'description']
                },
                where: { id: data.id },
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
                            exclude: ['id', 'password', 'description', 'createdAt', 'updatedAt']
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
            const subscribers = await Subscription.findAll({
                where: { seller_id: data.id }
            });

            data['products'] = products;
            data['subscribers'] = subscribers;
        }

        if (!data)
            data = null;

        res.send({
            success,
            data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false
        });
    }
};

const productFromSubscriptions = async (req: Request, res: Response) => {
    try {
        let success = true;
        const user = res.locals.user;

        const subscriptions = await Subscription.findAll({ where: { subscriber_id: user.id } });
        const s = subscriptions.map((e: any) => e.seller_id);

        const data = await Product.findAll({
            where: { id: s },
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
                    attributes: ['name']
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

        data.reverse();

        res.send({
            success,
            data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false
        });
    }
};

const subscriptions = async (req: Request, res: Response) => {
    try {
        let success = true;
        const user = res.locals.user;

        const s = await Subscription.findAll({ where: { subscriber_id: user?.id ?? 0 } });
        const seller_id = s.map((e) => e.seller_id);
        const data = await Seller.findAll({
            where: { id: seller_id },
            attributes: {
                exclude: ['password', 'description']
            },
            include: [
                {
                    association: new HasMany(Seller, Product, {
                        foreignKey: 'seller_id',
                        as: 'products'
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
                            attributes: ['name']
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
                                as: 'reviews',
                            }),
                            attributes: ['rating']
                        }
                    ]
                },
                {
                    association: new HasMany(Seller, Subscription, {
                        foreignKey: 'seller_id',
                        as: 'subscriptions'
                    }),
                    include: [
                        {
                            association: new HasOne(Subscription, User, {
                                sourceKey: 'subscriber_id',
                                foreignKey: 'id',
                                as: 'user'
                            }),
                            attributes: {
                                exclude: ['password']
                            }
                        }
                    ]
                }
            ]
        });
        data.reverse()
        data.forEach((e: any) => {
            e.products.reverse()
        });

        res.send({
            success,
            data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false
        });
    }
};

const subscribe = async (req: Request, res: Response) => {
    try {
        let success = true;
        const user = res.locals.user;
        const seller_id = req.body.seller_id;

        const data = await Subscription.findOne({
            where: { seller_id, subscriber_id: user.id }
        });

        if (data) {
            await Subscription.destroy({
                where: { seller_id, subscriber_id: user.id }
            });
        } else {
            await Subscription.create({
                seller_id, subscriber_id: user.id
            });
        }

        res.send({
            success,
            data: !!data ? 'unsubscribe' : 'subscribe'
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
    show,
    productFromSubscriptions,
    subscriptions,
    subscribe
};