const Sequelize = require('sequelize');


const sequelize = new Sequelize('employee_manager', 'root', 'password', {host: 'localhost', dialect: 'mysql', port: 3306, logging: false})
module.exports = sequelize;

