import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../configs/dbConnect';

type AdminAttributes = {
  id?: number,
  email: string,
  name: string,
  password: string,
  photo: string | null,

  createdAt?: Date,
  updatedAt?: Date
};

export interface AdminInput extends Optional<AdminAttributes, 'id'> { }
export interface AdminOutput extends Required<AdminAttributes> { }

class Admin extends Model<AdminAttributes, AdminInput> implements AdminAttributes {
  public id!: number;
  public email!: string;
  public name!: string;
  public password!: string;
  public photo!: string | null;

  public readonly createdAt!: Date | undefined;
  public readonly updatedAt!: Date | undefined;
}

Admin.init({
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
  photo: {
    allowNull: true,
    type: DataTypes.STRING
  },
}, {
  timestamps: true,
  sequelize: connection,
  tableName: 'admins'
});

export default Admin;
