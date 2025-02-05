// configurando o Sequelize
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("postgresql://pit:Vel3jHZD4LfaKEJ5_YRM0Q@parentalease-2526.g8x.gcp-southamerica-east1.cockroachlabs.cloud:26257/contas?sslmode=verify-full");

module.exports = sequelize;


