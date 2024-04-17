import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../configs/dbConnect';

type CartAttributes = {
  id?: number,
  user_id: number,
  product_id: number,
  qty: number,
  selected: boolean,

  createdAt?: Date,
  updatedAt?: Date
};

export interface CartInput extends Optional<CartAttributes, 'id'> { }
export interface CartOutput extends Required<CartAttributes> { }

class Cart extends Model<CartAttributes, CartInput> implements CartAttributes {
  public id!: number;
  public user_id!: number;
  public product_id!: number;
  public qty!: number;
  public selected!: boolean;

  public readonly createdAt!: Date | undefined;
  public readonly updatedAt!: Date | undefined;
}

Cart.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  selected: {
    type: DataTypes.BOOLEAN
  },
}, {
  timestamps: true,
  sequelize: connection,
  tableName: 'carts'
});

export default Cart;
