import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../configs/dbConnect';

type SubscriptionAttributes = {
  id?: number | bigint,
  subscriber_id: number,
  seller_id: number
};

export interface SubscriptionInput extends Optional<SubscriptionAttributes, 'id'> { }
export interface SubscriptionOutput extends Required<SubscriptionAttributes> { }

class Subscription extends Model<SubscriptionAttributes, SubscriptionInput> implements SubscriptionAttributes {
  public id!: number | bigint;
  public subscriber_id!: number;
  public seller_id!: number;
}

Subscription.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  subscriber_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  seller_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sellers',
      key: 'id'
    }
  }
}, {
  timestamps: false,
  sequelize: connection,
  tableName: 'subscriptions'
});

export default Subscription;
