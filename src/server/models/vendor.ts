'use strict';
import {
  Model
} from "sequelize";

type VendorAttributes = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  is_verified: boolean;
  activation_token: string;
  verification_token: string;
  status: string;
  photo: string;
  gender: string;
  address: string;
  dob: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Vendor extends Model<VendorAttributes>
  implements VendorAttributes  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    first_name!: string;
    last_name!: string;
    email!: string;
    password!: string;
    phone!: string;
    is_verified!: boolean;
    activation_token!: string;
    verification_token!: string;
    status!: string;
    photo!: string;
    gender!: string;
    address!: string;
    dob!: string;
    static associate(models: any) {
      // define association here
    }
  }
  Vendor.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    activation_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    verification_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("pending", "active", "blocked", "deleted"),
      defaultValue: "pending"
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: true
    }

  }, {
    sequelize,
    modelName: 'Vendor',
  });
  return Vendor;
};