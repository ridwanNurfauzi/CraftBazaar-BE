import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../configs/dbConnect';

type CategoryAttributes = {
  id?: number,
  name: string,

  createdAt?: Date,
  updatedAt?: Date
};

export interface CategoryInput extends Optional<CategoryAttributes, 'id'> { }
export interface CategoryOutput extends Required<CategoryAttributes> { }

class Category extends Model<CategoryAttributes, CategoryInput> implements CategoryAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date | undefined;
  public readonly updatedAt!: Date | undefined;
}

Category.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  }
}, {
  timestamps: true,
  sequelize: connection,
  tableName: 'categories'
});

export default Category;
