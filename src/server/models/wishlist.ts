'use strict';
import {
  Model
} from'sequelize';

type WishlistAttributes = {
customer_id: number;
total: number;
status: String;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Wishlist extends Model<WishlistAttributes> 
  implements WishlistAttributes {

    customer_id!: number;
    total!: number;
    status!: String;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  Wishlist.init({
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("pending", "active", "deleted"),
      defaultValue: "active"
    }
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};