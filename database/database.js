const Sequelize = require('sequelize')

const connection = new Sequelize('askme', 'root', null, {
    host: 'localhost', 
    dialect: 'mysql'
})

module.exports = connection 