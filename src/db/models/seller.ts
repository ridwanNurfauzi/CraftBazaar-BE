import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../configs/dbConnect';

type SellerAttributes = {
  id?: number,
  email: string,
  name: string,
  password: string,
  description: string | null,
  photo: string | null,

  createdAt?: Date,
  updatedAt?: Date
};

export interface SellerInput extends Optional<SellerAttributes, 'id'> { }
export interface SellerOutput extends Required<SellerAttributes> { }

class Seller extends Model<SellerAttributes, SellerInput> implements SellerAttributes {
  public id!: number;
  public email!: string;
  public name!: string;
  public password!: string;
  public description!: string | null;
  public photo!: string | null;

  public readonly createdAt!: Date | undefined;
  public readonly updatedAt!: Date | undefined;
}

Seller.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  photo: {
    allowNull: true,
    type: DataTypes.STRING
  },
}, {
  timestamps: true,
  sequelize: connection,
  tableName: 'sellers'
});

export default Seller;
