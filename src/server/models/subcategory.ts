'use strict';
import {
  Model
} from 'sequelize';

type SubCategoryAttributes = {
  category_id: number;
  name: string;
  status: string;
  slug: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class SubCategory extends Model <SubCategoryAttributes>
  implements SubCategoryAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    category_id!: number;
    name!: string;
    status!: string;
    slug!: string;
    static associate(models: any) {
      // define association here
    }
  }
  SubCategory.init({
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("active", "blocked", "deleted"),
      defaultValue: "active"
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'SubCategory',
  });
  return SubCategory;
};