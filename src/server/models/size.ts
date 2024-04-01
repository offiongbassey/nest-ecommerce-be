'use strict';
import {
  Model
} from 'sequelize';

type SizeAttributes ={
  size: string;
  status: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Size extends Model <SizeAttributes>
  implements SizeAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    size!: string;
    status!: string;
    static associate(models: any) {
      // define association here
      Size.hasMany(models.Product_Size, {
        foreignKey: "size_id",
        as: "_size"
      })
    }
  }
  Size.init({
    size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("active", "blocked", "deleted"),
      defaultValue: "active"
    }
  }, {
    sequelize,
    modelName: 'Size',
  });
  return Size;
};