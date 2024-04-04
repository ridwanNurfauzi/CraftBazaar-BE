import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../configs/dbConnect';
import Category from './category';
import User from './user';

type ProductAttributes = {
  id?: number,
  name: string,
  slug: string,
  description: string,
  stock: number,
  sold: number,
  price: string,
  weight: number,
  seller_id: number,

  createdAt?: Date,
  updatedAt?: Date
};

export interface ProductInput extends Optional<ProductAttributes, 'id'> { }
export interface ProductOutput extends Required<ProductAttributes> { }

class Product extends Model<ProductAttributes, ProductInput> implements ProductAttributes {
  public id!: number;

  public name!: string;
  public slug!: string;
  public description!: string;
  public stock!: number;
  public sold!: number;
  public price!: string;
  public weight!: number;
  public seller_id!: number;

  public readonly createdAt!: Date | undefined;
  public readonly updatedAt!: Date | undefined;
}

Product.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sold: {
    type: DataTypes.INTEGER
  },
  price: {
    type: DataTypes.STRING
  },
  weight: {
    type: DataTypes.INTEGER
  },
  seller_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sellers',
      key: 'id'
    }
  },
}, {
  timestamps: true,
  sequelize: connection,
  tableName: 'Products'
});

Product.belongsToMany(Category, { through: 'product_categories', foreignKey: 'product_id', otherKey: 'category_id', as: 'categories', timestamps: false });

export default Product;
