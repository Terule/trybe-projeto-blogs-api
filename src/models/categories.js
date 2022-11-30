'use strict';

module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define( 'Categories', {
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