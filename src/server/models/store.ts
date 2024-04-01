'use strict';
import {
  Model
} from "sequelize";

type StoreAttributes = {
vendor_id: number;
store_code: number;
name: string;
desc: string;
slug: string;
status: string;
address: string;
phone: string;
alt_phone: string;
email: string;
state: string;
city: string;
logo: string;
}

module.exports = (sequelize: any, DataTypes: any ) => {
  class Store extends Model<StoreAttributes> 
    implements StoreAttributes
  {
    vendor_id!: number;
    store_code!: number;
    name!: string;
    desc!: string;
    slug!: string;
    status!: string;
    address!: string;
    phone!: string;
    alt_phone!: string;
    email!: string;
    state!: string;
    city!: string;
    logo!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      Store.belongsTo(models.Vendor, {
        foreignKey: 'vendor_id',
        as: 'vendor'
      });
      Store.hasMany(models.Product, {
        foreignKey: "store_id",
        as: "store"
      })
  }
  }
  Store.init({
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    store_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("active", "blocked", "deleted"),
      defaultValue: "active"
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    alt_phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true
    },

  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};