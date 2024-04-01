'use strict';
import {
  Model
} from 'sequelize';

type ColorProperties = {
  color: string;
  code: string;
  status: string;
}

module.exports = (sequelize: any, DataTypes:any) => {
  class Color extends Model <ColorProperties>
  implements ColorProperties
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    color!: string;
    code!: string;
    status!: string;
    static associate(models: any) {
      // define association here
      Color.hasMany(models.Product_Color, {
        foreignKey: "color_id",
        as: "_color"
      })
    }
  }
  Color.init({
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("active", "blocked", "deleted"),
      defaultValue: "active"
    }
  }, {
    sequelize,
    modelName: 'Color',
  });
  return Color;
};