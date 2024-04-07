import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../configs/dbConnect';

type Product_imageAttributes = {
  id?: number | bigint,
  filename: string,
  product_id: number | string,
};

export interface Product_imageInput extends Optional<Product_imageAttributes, 'id'> { }
export interface Product_imageOutput extends Required<Product_imageAttributes> { }

class Product_image extends Model<Product_imageAttributes, Product_imageInput> implements Product_imageAttributes {
  public id!: number | bigint;
  public filename!: string;
  public product_id!: number | string;
}

Product_image.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  filename: {
    allowNull: false,
    type: DataTypes.STRING
  },
  product_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'products',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
}, {
  timestamps: false,
  sequelize: connection,
  tableName: 'Product_images'
});

export default Product_image;
