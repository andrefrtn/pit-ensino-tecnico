// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Postagem = sequelize.define('postagem', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conteudo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comentario: {
    type: DataTypes.STRING,
   allowNull: true,
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  timestamps: true,
});

module.exports = Postagem;
