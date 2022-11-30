'use strict';

module.exports = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('blogPosts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, {
    sequelize,
    timestamps: false,
    // modelName: 'blog_posts',
    underscored: true,
  });
  return blogPost;
};