const { Sequelize, DataTypes } = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/bookmark');


const Category = db.define('category', {
    category: {
      type: DataTypes.STRING,
    },
  });
  
  const Entry = db.define('entry', {
    siteName: {
      type: DataTypes.STRING,
    },
    siteURL: {
      type: DataTypes.STRING,
    },
  });
  
  Category.hasMany(Entry);
  Entry.belongsTo(Category);



  module.exports = {
      db,
      tabels: {
          Category,
          Entry
      }
  }