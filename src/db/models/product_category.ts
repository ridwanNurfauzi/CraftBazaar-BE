import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../configs/dbConnect';

type Product_categoryAttributes = {
  id?: number,
  product_id: number,
  category_id: number
};

export interface Product_categoryInput extends Optional<Product_categoryAttributes, 'id'> { }
export interface Product_categoryOutput extends Required<Product_categoryAttributes> { }

class Product_category extends Model<Product_categoryAttributes, Product_categoryInput> implements Product_categoryAttributes {
  public id!: number;
  public product_id!: number;
  public category_id!: number;
}

Product_category.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  product_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'products',
      key: 'id'
    }
  },
  category_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'categories',
      key: 'id'
    }
  }
}, {
  timestamps: false,
  sequelize: connection,
  tableName: 'product_categories'
});

export default Product_category;
