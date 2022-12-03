'use strict';

module.exports = (sequelize, DataTypes) => {
  const postsCategories = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  },   {
    sequelize,
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true,
  });


  postsCategories.associate = ({BlogPost, Category}) => {
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      through: postsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId'
    });
    Category.belongsToMany(BlogPost, {
      as: 'posts',
      through: postsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    })
  };

  return postsCategories;
};