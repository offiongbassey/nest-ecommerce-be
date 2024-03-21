'use strict';
import {
  Model
} from 'sequelize';

type CategoryAttributes = {
  name: string,
  status: string,
  slug: string
}

module.exports = (sequelize: any, DataTypes: any)  => {
  class Category extends Model<CategoryAttributes> 
  implements CategoryAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    name!:string;
    status!: string;
    slug!: string;
    
    static associate(models: any) {
      // define association here
    }
  }
  Category.init({
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
    modelName: 'Category',
  });
  return Category;
};