import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../configs/dbConnect';

type ReviewAttributes = {
  id?: number,
  rating: number,
  text: string,
  product_id: number,
  user_id: number,

  createdAt?: Date,
  updatedAt?: Date
};

export interface ReviewInput extends Optional<ReviewAttributes, 'id'> { }
export interface ReviewOutput extends Required<ReviewAttributes> { }

class Review extends Model<ReviewAttributes, ReviewInput> implements ReviewAttributes {
  public id!: number;

  public rating!: number;
  public text!: string;
  public product_id!: number;
  public user_id!: number;

  public readonly createdAt!: Date | undefined;
  public readonly updatedAt!: Date | undefined;
}

Review.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING,
    allowNull: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  sequelize: connection,
  tableName: 'reviews'
});

export default Review;
