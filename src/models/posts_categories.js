'use strict';

module.exports = (sequelize, DataTypes) => {
  const postsCategories = sequelize.init('PostsCategories', {
    post_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    // modelName: 'posts_categories',
    underscored: true,
  });
  return postsCategories;
};