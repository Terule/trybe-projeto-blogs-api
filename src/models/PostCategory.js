'use strict';

module.exports = (sequelize, DataTypes) => {
  const postsCategories = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    // modelName: 'posts_categories',
    underscored: true,
  });


  postsCategories.associate = ({BlogPost, Category}) => {
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      through: postsCategories,
      foreignKey: 'post_id',
      otherKey: 'category_id'
    });
    Category.belongsToMany(BlogPost, {
      as: 'posts',
      through: postsCategories,
      foreignKey: 'post_id',
      otherKey: 'category_id'
    })
  };

  return postsCategories;
};