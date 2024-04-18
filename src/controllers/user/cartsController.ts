import { Request, Response } from "express";
import Cart from "../../db/models/cart";
import Product from "../../db/models/product";
import Product_image from "../../db/models/product_image";
import { HasMany, HasOne } from "sequelize";
import Seller from "../../db/models/seller";

const index = async (req: Request, res: Response) => {
    try {
        const user_id = res.locals.user.id ?? 0;
        const cart = await Cart.findAll({ where: { user_id } });
        const arr = cart.map(e => e.product_id);

        const products = await Product.findAll({
            where: { id: arr },
            attributes: {
                exclude: ['description']
            },
            include: [
                {
                    association: new HasOne(Product, Cart, {
                        foreignKey: 'product_id',
                        as: 'cart'
                    })
                },
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
                }
            ]
        });

        res.send({
            success: true,
            data: products
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
        const user_id = res.locals.user.id ?? 0;
        const product_id: number = req.body.product_id ?? 0;
        const qty = req.body.qty;

        const product = await Product.findOne({ where: { id: product_id } });
        const check = await Cart.findOne({ where: { user_id, product_id } });

        if (Number.isNaN(qty) || !qty || !product?.stock) {
            return res.status(400).send({
                success: false
            });
        }

        if (check) {
            const sum: number = (check.qty + Number(qty));
            if (sum <= product.stock) {
                check.qty = check.qty + Number(qty);
                const data = await Cart.update({ qty: sum },
                    {
                        where: {
                            product_id: check.product_id,
                            user_id: check.user_id
                        }
                    });
                return res.send({
                    success: true,
                    data
                });
            }
            return res.status(409).send({
                success: false
            });
        } else {
            const data = await Cart.create({ user_id, product_id, qty, selected: false });

            return res.send({
                success: true,
                data
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
        const user_id = res.locals.user.id ?? 0;
        const product_id = req.params.product_id;

        const t = await Cart.destroy({ where: { product_id, user_id } });

        if (!t)
            return res.status(404).send({ success: false });

        return res.send({
            success: !!t,
            t
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false
        });
    }
};

const increment = async (req: Request, res: Response) => {
    try {
        const user_id = res.locals.user.id ?? 0;
        const product_id = req.params.product_id ?? 0;

        const check = await Cart.findOne({ where: { user_id, product_id } });
        const product = await Product.findOne({ where: { id: product_id } });

        if (!check)
            return res.status(404).send({
                success: false
            });
        const qty: number = check.qty + 1;

        if ((product?.stock) && qty <= product?.stock) {
            const t = await Cart.update({ qty }, { where: { user_id, product_id } });

            return res.send({
                success: true,
                t
            });
        } else {
            return res.status(409).send({
                success: false,
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false
        });
    }
};

const decrement = async (req: Request, res: Response) => {
    try {
        const user_id = res.locals.user.id ?? 0;
        const product_id = req.params.product_id ?? 0;

        const check = await Cart.findOne({ where: { user_id, product_id } });
        const product = await Product.findOne({ where: { id: product_id } });

        if (!check)
            return res.status(404).send({
                success: false
            });

        if ((product?.stock)) {
            const qty: number = check.qty - 1;

            if (qty >= 1) {
                const t = await Cart.update({ qty }, { where: { user_id, product_id } });

                return res.send({
                    success: true,
                    t
                });
            }
            else {
                await Cart.destroy({ where: { user_id, product_id } });
                return res.send({ success: true });
            }
        } else {
            return res.status(409).send({
                success: false,
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false
        });
    }
};

const select = async (req: Request, res: Response) => {
    try {
        const user_id = res.locals.user.id ?? 0;
        const product_id = req.params.product_id ?? 0;

        const check = await Cart.findOne({ where: { user_id, product_id } });

        if (!check)
            return res.status(404).send({
                success: false
            });

        await Cart.update({ selected: !check.selected }, { where: { user_id, product_id } });
        return res.send({ success: true });
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
    destroy,
    increment,
    decrement,
    select
};