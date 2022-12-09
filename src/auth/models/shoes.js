'use strict';

const shoesModel = (sequelize, DataTypes) => sequelize.define ('Shoes', {
  name: {
    type: DataTypes.STRING,
    required: true, 
  },
  color: { type: DataTypes.STRING, required: true },
  size: { type: DataTypes.INTEGER, required: true},
  brand: {type: DataTypes.ENUM('Crocs', 'Uggs', 'Nike', 'Adidas', 'Champion'), required: true},
});

module.exports = shoesModel;