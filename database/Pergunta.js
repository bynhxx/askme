// MODEL Perguntas

const Sequelize = require('sequelize')
const connection = require('./database')


//Definindo o nome da tabela..
//define(nomeDaTabela, {campos: {...})
const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING, 
        allowNull: false, 
    },
    descricao: {
        type: Sequelize.TEXT, 
        allowNull: false
    }
}) 

Pergunta.sync({force: false}).then(()=> {console.log('tabela criada')})
//Não força a criação da tabela caso ela já exista

module.exports = Pergunta