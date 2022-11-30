'use strict';

module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define( 'Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    // modelName: 'categories',
    underscored: true,
  });
  return categories;
};