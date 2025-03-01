const {  DataTypes } = require('sequelize');
const {sequelizeConn} = require('../database'); // Adjust path if needed

const Data = sequelizeConn.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(45), 
    allowNull: false
  },
  image: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  isEdit: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  description: {
    type: DataTypes.STRING(200),
    allowNull: true
  }
}, {
  tableName: 'product', // Explicitly set table name
  timestamps: false // Disable createdAt & updatedAt fields
});

module.exports = Data;