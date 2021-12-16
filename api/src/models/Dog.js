const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    weight:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    life_span:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    origin:{
      type:DataTypes.STRING
    },
    description:{
      type:DataTypes.TEXT
    }
  })
  
};
